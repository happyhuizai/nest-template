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
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class RoleInput {
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
  groups!: unknown;

  @ApiProperty()
  @IsDefined()
  permissions!: unknown;
}

export class CreateRoleInput extends OmitType(RoleInput, [] as const) {}

export class UpdateRoleInput extends PartialType(CreateRoleInput) {}
