import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsJWT, IsEmail, IsString } from 'class-validator';

export class CreateUserReqDto {
  @ApiProperty({
    type: String,
    description: 'The username of the user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
  })
  @IsString()
  password: string;
}

export class LoginReqDto extends PickType(CreateUserReqDto, [
  'username',
  'password',
]) {}

export class UserRefreshTokenReqDto {
  @ApiProperty({
    type: String,
    description: 'JWT token for user refresh',
  })
  @IsJWT()
  token: string;
}
