import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationReqDto } from '@/shared/dto/req.dto';

export class CreatePositionReqDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  departmentId: number;
}
export class UpdatePositionResDto extends PartialType(CreatePositionReqDto) {}

export class FindAllPositionReqDto extends PaginationReqDto {
  @ApiProperty()
  @IsString()
  name: string;
}
