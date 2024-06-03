import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches, IsJWT } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    minLength: 6,
    maxLength: 10,
    pattern: '^[a-zA-Z0-9]+$',
    description: '用户名长度6至10个字符，只能包含字母和数字',
  })
  @Length(6, 10, {
    message: '用户名长度6至20个字符',
  })
  @Matches(/^[a-zA-Z0-9]+$/, { message: '用户名只能包含字母和数字' })
  username: string;

  @ApiProperty({
    description: '密码',
  })
  @IsString()
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}

export class UserRefreshTokenDto {
  @ApiProperty({
    description: '刷新token',
  })
  @IsJWT()
  @IsNotEmpty({
    message: 'token不能为空',
  })
  token: string;
}
