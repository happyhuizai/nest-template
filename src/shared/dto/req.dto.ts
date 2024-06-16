import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class PaginationReqDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit: number;
}

export class IdReqDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
