import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import type { EnvironmentVariables } from '../../shared/env.validation';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory(config: ConfigService<EnvironmentVariables, true>) {
        return {
          secret: config.get('JWT_SECRET_KEY', { infer: true }),
          signOptions: {
            expiresIn: config.get('JWT_EXPIRES', { infer: true }),
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
