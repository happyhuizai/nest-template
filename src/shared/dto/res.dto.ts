import { Expose } from 'class-transformer';

export class PaginationResDto<T> {
  @Expose()
  total: number;
  @Expose()
  items: T[];
}

export class ResSuccessDto<T = unknown> {
  success: boolean;
  data: T;
}

export class ResFailDto {
  success: boolean;
  message: string;
}
