import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import Redis from 'ioredis';
import * as argon2 from 'argon2';

import { UserService } from '../user/user.service';

import { refreshTokenCacheKey } from '@/shared/redis.keys';

import type { CreateUserReqDto, LoginReqDto } from './dto/auth.req.dto';
import type { EnvironmentVariables } from '@/shared/env.validation';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentVariables, true>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async createUser(data: CreateUserReqDto) {
    try {
      const { id, username, email } = await this.userService.createUser(data);
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
        throw new UnauthorizedException('Duplicate username');
      }
      throw new BadRequestException(error.message || 'Failed to create user');
    }
  }

  async validateUserLocal(data: LoginReqDto) {
    const { username, password } = data;
    const user = await this.userService.findOneUser({
      username,
    });
    if (!user) {
      throw new UnauthorizedException('Incorrect username/password');
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      throw new UnauthorizedException('Incorrect password');
    }
    return user;
  }

  async validateUserJwt(id: number) {
    const user = await this.userService.findOneUser({
      id,
    });
    if (!user) {
      throw new UnauthorizedException(
        'Invalid login credentials, please log in again',
      );
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

  async refreshToken(oldToken: string) {
    try {
      const { id } = this.jwtService.verify(oldToken, {
        secret: this.configService.get('JWT_REFRESH_KEY'),
      });
      const refreshTokenData = await this.redis.get(refreshTokenCacheKey(id));
      if (!refreshTokenData) {
        throw new BadRequestException(
          'Invalid refresh token, please log in again',
        );
      }
      const { refreshToken, refreshCount } = JSON.parse(refreshTokenData);
      if (refreshToken !== oldToken) {
        throw new BadRequestException(
          'Invalid refresh token, please log in again',
        );
      }
      const maxRefreshCount = this.configService.get('REFRESH_JWT_MAX_COUNT', {
        infer: true,
      });
      if (refreshCount > maxRefreshCount) {
        throw new BadRequestException(
          'Refresh token limit exceeded, please log in again',
        );
      }
      return this.generateUserTokens(id, refreshCount + 1);
    } catch (error) {
      throw new BadRequestException(
        'Invalid refresh token, please log in again',
      );
    }
  }
}
