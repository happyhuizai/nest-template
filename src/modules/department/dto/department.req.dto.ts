import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { PaginationReqDto } from '../../../shared/dto/req.dto';

export class CreateDepartmentReqDto {
  @ApiProperty()
  @IsString()
  name: string;
}
export class UpdateDepartmentResDto extends PartialType(
  CreateDepartmentReqDto,
) {}

export class FindAllDepartmentReqDto extends PaginationReqDto {
  @ApiProperty()
  @IsString()
  name: string;
}
