/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IsISO8601 } from 'class-validator';
import { IsString } from 'class-validator';
import { IsDefined } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class PolicyInput {
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
  @IsString()
  action!: string;

  @ApiProperty()
  @IsString()
  subject!: string;

  @ApiProperty()
  @IsDefined()
  permissions!: unknown;
}

export class CreatePolicyInput extends OmitType(PolicyInput, [] as const) {}

export class UpdatePolicyInput extends PartialType(CreatePolicyInput) {}
