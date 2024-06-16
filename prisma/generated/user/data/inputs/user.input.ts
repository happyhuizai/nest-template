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

export class UserInput {
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
  username!: string;

  @ApiProperty()
  @IsString()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty()
  @IsDefined()
  groups!: unknown;
}

export class CreateUserInput extends OmitType(UserInput, [] as const) {}

export class UpdateUserInput extends PartialType(CreateUserInput) {}
