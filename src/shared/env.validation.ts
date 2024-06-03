import { plainToInstance } from 'class-transformer';
import {
  IsPort,
  IsIP,
  IsString,
  validateSync,
  IsStrongPassword,
  Min,
  Max,
  Length,
  IsNumber,
  IsEnum,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  PREFIX: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsNumber()
  THROTTLER_TT: number;

  @IsNumber()
  THROTTLER_LIMIT: number;

  @IsStrongPassword()
  JWT_SECRET_KEY: string;

  @IsStrongPassword()
  JWT_REFRESH_KEY: string;

  @IsNumber()
  JWT_EXPIRES: number;

  @IsNumber()
  REFRESH_JWT_EXPIRES: number;

  @IsNumber()
  REFRESH_JWT_MAX_COUNT: number;

  @IsIP()
  MYSQL_HOST: string;

  @IsPort()
  MYSQL_PORT: string;

  @IsString()
  MYSQL_USER: string;

  @IsString()
  @Length(25)
  MYSQL_PASSWORD: string;

  @IsString()
  @Length(25)
  MYSQL_ROOT_PASSWORD: string;

  @IsString()
  MYSQL_DATABASE: string;

  @IsIP()
  REDIS_HOST: string;

  @IsPort()
  REDIS_PORT: string;

  @IsString()
  REDIS_DB: string;

  @IsString()
  @Length(25)
  REDIS_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
