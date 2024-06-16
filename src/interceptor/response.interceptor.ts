import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { Reflector } from '@nestjs/core';
import { SERIALIZE_KEY } from 'src/decorators/serialize.decorator';

import type { ResSuccessResDto } from '../shared/dto/res.dto';
import type { ClassConstructor } from 'class-transformer';
import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResSuccessResDto<unknown>> {
    const classSerialize: ClassConstructor<unknown> = this.reflector.get<
      ClassConstructor<any>
    >(SERIALIZE_KEY, context.getHandler());

    return next.handle().pipe(
      map((data) => ({
        success: true,
        data: plainToInstance(classSerialize, data),
      })),
    );
  }
}
