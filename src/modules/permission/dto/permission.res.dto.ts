import { ApiProperty } from '@nestjs/swagger';

import { PaginationResDto } from '../../../shared/dto/res.dto';

export class PermissionItem {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class FindAllPermissionResDto extends PaginationResDto<PermissionItem> {}
