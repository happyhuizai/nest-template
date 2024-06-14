import { PickType } from '@nestjs/swagger';
import { IsJWT, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {}

export class UserRefreshTokenDto {
  @IsJWT()
  token: string;
}
