import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { Public } from '../../decorators/public.decorator';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  CreateUserReqDto,
  LoginReqDto,
  UserRefreshTokenReqDto,
} from './dto/auth.req.dto';
import { CurrentUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginReqDto })
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User) {
    const { username, id } = user;
    const tokens = await this.authService.generateUserTokens(id);
    return {
      username,
      ...tokens,
    };
  }

  @Post('signup')
  @Public()
  signup(@Body() body: CreateUserReqDto) {
    return this.authService.createUser(body);
  }

  @Post('refreshToken')
  @Public()
  async refreshToken(@Body() token: UserRefreshTokenReqDto) {
    return this.authService.refreshToken(token.token);
  }
}
