import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { mw as requestIpMw } from 'request-ip';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { json, urlencoded } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

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

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('netjs-template')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (_controllerKey: string, methodKey: string) =>
        methodKey,
    });
    SwaggerModule.setup(prefix, app, document);
  }

  app.useLogger(logger);
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb', extended: true }));
  app.use(helmet());
  app.use(requestIpMw({ attributeName: 'ip' }));
  app.setGlobalPrefix(prefix);

  await app.listen(port);

  const address = await app.getUrl();
  logger.log(`API服务已经启动，请访问: ${address}`);
  if (process.env.NODE_ENV === 'development') {
    logger.log(`API文档已生成，请访问: ${address}/${prefix}`);
  }
}
bootstrap();
