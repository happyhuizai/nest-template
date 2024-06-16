import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import type { INestApplication } from '@nestjs/common';
import type { SwaggerCustomOptions } from '@nestjs/swagger';

export const setupSwagger = async (app: INestApplication) => {
  const logger = new Logger();

  const documentBuild = new DocumentBuilder()
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refreshToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuild, {
    deepScanRoutes: true,
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  });
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: 'list',
      persistAuthorization: true,
      displayOperationId: true,
      tagsSorter: 'alpha',
      filter: true,
    },
  };
  SwaggerModule.setup('/docs', app, document, {
    explorer: true,
    ...customOptions,
  });
  logger.log(`Docs will serve on /docs, 'NestApplication`);
};
