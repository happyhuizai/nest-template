import { ApiProperty } from '@nestjs/swagger';

import { PaginationResDto } from '../../../shared/dto/res.dto';

export class RoleItem {
  @ApiProperty()
  name: string;
}

export class FindAllRoleResDto extends PaginationResDto<RoleItem> {}
