import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';

import { CHECK_POLICIES_KEY } from './casl.decorators';
import { PermissionsService } from '../permissions/permissions.service';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { PolicyHandler } from './policy.handler.interface';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
    const { user } = context.switchToHttp().getRequest();
    const ability = await this.permissionsService.defineAbilitiesFor(user);

    for (const handler of policyHandlers) {
      if (typeof handler === 'function') {
        if (!handler(ability)) {
          throw new ForbiddenException(
            'You do not have permission to perform this action',
          );
        }
      }
    }

    return true;
  }
}
