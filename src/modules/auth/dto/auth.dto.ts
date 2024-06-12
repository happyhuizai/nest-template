import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches, IsJWT } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    minLength: 6,
    maxLength: 10,
    pattern: '^[a-zA-Z0-9]+$',
  })
  @Length(6, 10, {
    message: '用户名长度需为6至10个字符',
  })
  @Matches(/^[a-zA-Z0-9]+$/, { message: '用户名只能包含字母和数字' })
  username: string;

  @ApiProperty({
    description: '密码',
    example: 'Password123',
  })
  @Length(8, 16, {
    message: '密码长度需为8至16个字符',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/, {
    message: '密码必须包含至少一个小写字母、一个大写字母和一个数字',
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
