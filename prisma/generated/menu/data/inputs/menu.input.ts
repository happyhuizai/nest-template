/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IsISO8601 } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { IsString } from 'class-validator';
import { IsDefined } from 'class-validator';
import { IsOptional } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class MenuInput {
  @ApiProperty()
  @IsInt()
  id!: number;

  @ApiProperty()
  @IsISO8601()
  createdAt!: Date;

  @ApiProperty()
  @IsISO8601()
  updatedAt!: Date;

  @ApiProperty()
  @IsBoolean()
  isDeleted!: boolean;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsDefined()
  type!: unknown;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  route?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  component?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  keepAlive?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  outlink?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  parentId?: number;

  @ApiProperty()
  @IsDefined()
  permissions!: unknown;
}

export class CreateMenuInput extends OmitType(MenuInput, [] as const) {}

export class UpdateMenuInput extends PartialType(CreateMenuInput) {}
