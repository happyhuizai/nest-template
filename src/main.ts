import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { mw as requestIpMw } from 'request-ip';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { json, urlencoded } from 'body-parser';
import { VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { setupSwagger } from './shared/swagger';

import type { EnvironmentVariables } from './shared/env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    autoFlushLogs: true,
  });

  const logger = app.get(Logger);
  const config = app.get(ConfigService<EnvironmentVariables, true>);
  const port = config.get('PORT', { infer: true });
  const prefix = config.get('PREFIX', { infer: true });

  app.useLogger(logger);
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb', extended: true }));
  app.use(helmet());
  app.use(requestIpMw({ attributeName: 'ip' }));
  app.setGlobalPrefix(prefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  setupSwagger(app);
  await app.listen(port);
  logger.log(`🚀 service started successfully on port ${port}`);
}
bootstrap();
