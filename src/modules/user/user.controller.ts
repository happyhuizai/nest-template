// import { Controller, Post, Get, Body, UseGuards, SerializeOptions } from '@nestjs/common';
// import { Public } from '../../decorators/public.decorator'
// import { LocalAuthGuard } from '../../guards/local-auth.guard'
// import { AuthService, } from './auth.service';
// import { UserService } from '../user/user.service'
// import { CreateUserDto, UserRefreshTokenDto } from './auth.dto'
// import { User } from '@prisma/client'
// import { CurrentUser } from '../../decorators/current-user.decorator'

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService, private readonly userService: UserService,) { }

//   @Post('login')
//   @Public()
//   @UseGuards(LocalAuthGuard)
//   async login(@CurrentUser() user: User) {
//     const { username, uuid } = user;
//     const tokens = await this.authService.generateUserTokens(uuid);
//     return {
//       username,
//       ...tokens,
//     };
//   }

//   @Post('signup')
//   @Public()
//   signup(@Body() body: CreateUserDto) {
//     return this.authService.createUser(body);
//   }

//   @Post('refreshToken')
//   @Public()
//   async refreshToken(@Body() token: UserRefreshTokenDto) {
//     return this.authService.refreshToken(token.token);
//   }
// }
