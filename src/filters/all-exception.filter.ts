import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { ResFailDto } from '../shared/dto/res.dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: ResFailDto = {
      message: `${exception || 'Internal Server Error'}`,
      success: false,
    };
    httpAdapter.reply(ctx.getResponse(), errorResponse, httpStatus);
  }
}
