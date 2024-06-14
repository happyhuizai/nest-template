import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';

import { Public } from '../../decorators/public.decorator';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto, UserRefreshTokenDto } from './dto/auth.dto';
import { CurrentUser } from '../../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
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
  signup(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @Post('refreshToken')
  @Public()
  async refreshToken(@Body() token: UserRefreshTokenDto) {
    return this.authService.refreshToken(token.token);
  }
}
