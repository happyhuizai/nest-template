import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { PaginationReqDto } from '../../../shared/dto/req.dto';

export class CreateRoleReqDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdateRoleReqDto extends PartialType(CreateRoleReqDto) {}

export class FindAllRoleReqDto extends PaginationReqDto {
  @ApiProperty()
  @IsString()
  name: string;
}
