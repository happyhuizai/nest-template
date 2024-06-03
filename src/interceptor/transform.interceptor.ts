import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { ResSuccessDto } from '../shared/dto/res.dto';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResSuccessDto<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResSuccessDto<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
