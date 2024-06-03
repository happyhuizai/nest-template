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
import type { CreateUserDto } from './dto/auth.dto';

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
      const { uuid, username } = await this.userService.createUser(user);
      const token = await this.generateUserTokens(uuid);
      return {
        ...token,
        username,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new UnauthorizedException('用户名重复');
      }
      throw new Error(e);
    }
  }

  async validateUserLocal(info: Prisma.UserCreateInput) {
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

  async validateUserJwt(uuid: number) {
    const user = await this.userService.findOneUser({
      uuid,
    });
    if (!user) {
      throw new UnauthorizedException('登录凭证无效请重新登录');
    }
    return user;
  }

  async generateUserTokens(uuid: number, refreshCount?: number) {
    const accessToken = this.jwtService.sign({ uuid });
    const refreshTokenExpires = this.configService.get('REFRESH_JWT_EXPIRES', {
      infer: true,
    });
    const refreshTokenSecret = this.configService.get('JWT_REFRESH_KEY', {
      infer: true,
    });
    const maxRefreshCount = this.configService.get('REFRESH_JWT_MAX_COUNT');
    const refreshToken = this.jwtService.sign(
      { uuid },
      { expiresIn: refreshTokenExpires, secret: refreshTokenSecret },
    );
    await this.redis.set(
      refreshTokenCacheKey(uuid),
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
      const { uuid } = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_KEY'),
      });
      const refreshTokenData = await this.redis.get(refreshTokenCacheKey(uuid));
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
      return this.generateUserTokens(uuid, refreshCount + 1);
    } catch (error) {
      throw new BadRequestException('刷新凭证无效请重新登录');
    }
  }
}
