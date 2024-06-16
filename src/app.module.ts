import {
  BadRequestException,
  Module,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import {
  PrismaModule,
  loggingMiddleware,
  PrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import {
  APP_FILTER,
  APP_GUARD,
  APP_PIPE,
  APP_INTERCEPTOR,
  HttpAdapterHost,
} from '@nestjs/core';
import dayjs from 'dayjs';

import { ResponseInterceptor } from './interceptor/response.interceptor';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { validate } from './shared/env.validation';
import { RoleModule } from './modules/role/role.module';
import { PolicyModule } from './modules/policy/policy.module';
import { GroupModule } from './modules/group/group.module';
import { MenuModule } from './modules/menu/menu.module';

import type { QueryInfo } from 'nestjs-prisma';
import type { EnvironmentVariables } from './shared/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [`.env.${process.env.NODE_ENV || `development`}`, '.env'],
      validate,
      cache: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ssZ')}"`,
        // serializers: {
        //   req(req) {
        //     req.body = req.raw.body;
        //     return req;
        //   },
        // },
      },
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
      },
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => ({
        readyLog: true,
        config: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          password: config.get('REDIS_PASSWORD'),
          db: config.get('REDIS_DB'),
        },
      }),
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => [
        {
          ttl: config.get('THROTTLER_TT'),
          limit: config.get('THROTTLER_LIMIT'),
        },
      ],
    }),
    AuthModule,
    RoleModule,
    MenuModule,
    GroupModule,
    PolicyModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter, {});
      },
      inject: [HttpAdapterHost],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
        exceptionFactory(errors) {
          const constraints = errors[0].constraints;
          const message = constraints
            ? constraints[Object.keys(constraints)[0]]
            : 'Invalid request format"';
          throw new BadRequestException(message);
        },
      }),
    },
  ],
})
export class AppModule {}
