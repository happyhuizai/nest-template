import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { PUBLIC_KEY } from '../decorators/public.decorator';

import type { Prisma } from '@prisma/client';
import type { ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = Prisma.UserCreateInput | never>(
    error: Error,
    user?: TUser,
  ): TUser {
    if (error || !user) {
      throw (
        error ||
        new UnauthorizedException(
          'Invalid login credentials. Please log in again.',
        )
      );
    }
    return user;
  }
}
