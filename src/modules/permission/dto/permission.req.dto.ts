import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { PaginationReqDto } from '@/shared/dto/req.dto';

export class CreatePermissionReqDto {
  @ApiProperty()
  @IsString()
  name: string;
}
export class UpdatePermissionResDto extends PartialType(
  CreatePermissionReqDto,
) {}

export class FindAllPermissionReqDto extends PaginationReqDto {
  @ApiProperty()
  @IsString()
  name: string;
}
