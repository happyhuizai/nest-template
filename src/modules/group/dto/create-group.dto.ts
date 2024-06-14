import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: '名字',
    example: 'Password123',
  })
  @IsString()
  name: string;
}
