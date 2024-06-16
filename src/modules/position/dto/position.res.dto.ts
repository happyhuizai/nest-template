import { ApiProperty } from '@nestjs/swagger';

import { PaginationResDto } from '@/shared/dto/res.dto';

export class PositionItem {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class FindAllPositionResDto extends PaginationResDto<PositionItem> {}
