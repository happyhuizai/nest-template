import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

import { UserService } from '../user/user.service';
import { refreshTokenCacheKey } from '../../shared/redis.keys';

import type { EnvironmentVariables } from '../../shared/env.validation';
import type { CreateUserDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentVariables, true>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async createUser(user: CreateUserDto) {
    try {
      const { id, username, email } = await this.userService.createUser(user);
      const token = await this.generateUserTokens(id);
      return {
        ...token,
        username,
        email,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new UnauthorizedException('用户名重复');
      }
      throw new BadRequestException(error.message || '创建用户失败');
    }
  }

  async validateUserLocal(info: LoginDto) {
    const { username, password } = info;
    const user = await this.userService.findOneUser({
      username,
    });
    if (!user) {
      throw new UnauthorizedException('请输入正确的用户名/密码');
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      throw new UnauthorizedException('密码有误');
    }
    return user;
  }

  async validateUserJwt(id: number) {
    const user = await this.userService.findOneUser({
      id,
    });
    if (!user) {
      throw new UnauthorizedException('登录凭证无效请重新登录');
    }
    return user;
  }

  async generateUserTokens(id: number, refreshCount?: number) {
    const accessToken = this.jwtService.sign({ id });
    const refreshTokenExpires = this.configService.get('REFRESH_JWT_EXPIRES', {
      infer: true,
    });
    const refreshTokenSecret = this.configService.get('JWT_REFRESH_KEY', {
      infer: true,
    });
    const maxRefreshCount = this.configService.get('REFRESH_JWT_MAX_COUNT', {
      infer: true,
    });
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: refreshTokenExpires, secret: refreshTokenSecret },
    );
    await this.redis.set(
      refreshTokenCacheKey(id),
      JSON.stringify({
        refreshToken,
        refreshCount: refreshCount || maxRefreshCount,
      }),
      'EX',
      refreshTokenExpires,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const { id } = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_KEY'),
      });
      const refreshTokenData = await this.redis.get(refreshTokenCacheKey(id));
      if (!refreshTokenData) {
        throw new BadRequestException('刷新凭证无效请重新登录');
      }
      const { refreshToken: storedRefreshToken, refreshCount } =
        JSON.parse(refreshTokenData);
      if (storedRefreshToken !== refreshToken) {
        throw new BadRequestException('刷新凭证无效请重新登录');
      }
      const maxRefreshCount = this.configService.get('REFRESH_JWT_MAX_COUNT', {
        infer: true,
      });
      if (refreshCount > maxRefreshCount) {
        throw new BadRequestException('刷新凭证次数已达上限，请重新登录');
      }
      return this.generateUserTokens(id, refreshCount + 1);
    } catch (error) {
      throw new BadRequestException('刷新凭证无效请重新登录');
    }
  }
}
