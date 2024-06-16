import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { AuthService } from './auth.service';
import {
  LoginReqDto,
  CreateUserReqDto,
  UserRefreshTokenReqDto,
} from './dto/auth.req.dto';

import { CurrentUser } from '@/decorators/current.user.decorator';
import { Public } from '@/decorators/public.decorator';
import { LocalAuthGuard } from '@/guards/local.auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginReqDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    const { username, id } = user;
    const tokens = await this.authService.generateUserTokens(id);
    return {
      username,
      ...tokens,
    };
  }

  @Public()
  @Post('signup')
  signup(@Body() body: CreateUserReqDto) {
    return this.authService.createUser(body);
  }

  @Public()
  @Post('refreshToken')
  async refreshToken(@Body() token: UserRefreshTokenReqDto) {
    return this.authService.refreshToken(token.token);
  }
}
