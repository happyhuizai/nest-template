import { ApiProperty } from '@nestjs/swagger';

import { PaginationResDto } from '../../../shared/dto/res.dto';

export class DepartmentItem {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class FindAllDepartmentResDto extends PaginationResDto<DepartmentItem> {}
