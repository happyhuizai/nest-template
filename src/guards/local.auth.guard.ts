import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { Prisma } from '@prisma/client';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = Prisma.UserCreateInput | never>(
    error: Error,
    user?: TUser,
  ): TUser {
    if (error || !user) {
      throw (
        error ||
        new UnauthorizedException('Please enter your username and password.')
      );
    }
    return user;
  }
}
