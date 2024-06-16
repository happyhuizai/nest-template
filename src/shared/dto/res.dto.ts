import { ApiProperty } from '@nestjs/swagger';

export class PaginationResDto<T> {
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  items: T[];
}

export class ResSuccessResDto<T = unknown> {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  data: T;
}
