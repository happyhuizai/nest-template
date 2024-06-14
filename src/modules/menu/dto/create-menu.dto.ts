import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEnum,
  IsUrl,
  IsNotEmpty,
  Min,
} from 'class-validator';
import { MenuType } from '@prisma/client'; // 假设 MenuType 是从 @prisma/client 导入的

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MenuType)
  type: MenuType;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsString()
  route?: string;

  @IsOptional()
  @IsString()
  component?: string;

  @IsOptional()
  @IsBoolean()
  keepAlive?: boolean;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsOptional()
  @IsUrl()
  outlink?: string;

  @IsOptional()
  @IsInt()
  parentId?: number;
}
