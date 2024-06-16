import { NestFactory } from '@nestjs/core';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { mw as requestIpMw } from 'request-ip';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { json, urlencoded } from 'body-parser';
import { VersioningType } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { setupSwagger } from './shared/swagger';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { EnvironmentVariables } from './shared/env.validation';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const logger = app.get(Logger);
  const config = app.get(ConfigService<EnvironmentVariables, true>);
  const port = config.get('PORT', { infer: true });
  const prefix = config.get('PREFIX', { infer: true });

  app.useLogger(logger);
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb', extended: true }));
  app.use(requestIpMw({ attributeName: 'ip' }));
  app.setGlobalPrefix(prefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  await app.register(fastifyCsrf);
  setupSwagger(app);
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 service started successfully on port ${port}`);
}
bootstrap();
