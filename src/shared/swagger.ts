import { Logger, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  DocumentBuilder,
  SwaggerModule,
  getSchemaPath,
} from '@nestjs/swagger';

import { PaginationResDto, ResSuccessResDto } from './dto/res.dto';

import type { INestApplication, Type } from '@nestjs/common';
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

export const CustomApiResponse = <TModel extends Type<unknown>>(
  model: TModel,
  type?: 'list',
) => {
  const successSchema =
    type && type === 'list'
      ? {
          $ref: getSchemaPath(PaginationResDto),
          properties: {
            items: {
              type: 'array',
              $ref: getSchemaPath(model),
            },
          },
        }
      : {
          $ref: getSchemaPath(model),
        };
  return applyDecorators(
    ApiBearerAuth('accessToken'),
    ApiExtraModels(ResSuccessResDto, PaginationResDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResSuccessResDto) },
          {
            properties: {
              data: successSchema,
            },
          },
        ],
      },
    }),
  );
};
