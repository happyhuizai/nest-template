import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class PaginationResDto<T> {
  @IsOptional()
  @IsString()
  cursor: string;

  @IsOptional()
  @IsString()
  limit: number;
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
