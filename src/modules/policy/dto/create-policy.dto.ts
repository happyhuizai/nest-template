import {
  IsString,
  IsOptional,
  IsBoolean,
  IsJSON,
  IsNotEmpty,
} from 'class-validator';

export class CreatePolicyDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  subject: string;

  @IsOptional()
  @IsJSON()
  fields?: any;

  @IsOptional()
  @IsJSON()
  conditions?: any;

  @IsOptional()
  @IsBoolean()
  inverted?: boolean;

  @IsOptional()
  @IsString()
  reason?: string;
}
