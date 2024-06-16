// casl-guard.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityBuilder, ForbiddenError } from '@casl/ability';
import { PrismaService } from 'nestjs-prisma';

import { POLICY_KEY } from '../decorators/check.policy.decorator';
import { createPrismaAbility } from '../shared/casl-prisma';

import type { CheckPolicyParams } from '../decorators/check.policy.decorator';
import type { Policy } from '@prisma/client';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const definePolicy = this.reflector.get<CheckPolicyParams>(
      POLICY_KEY,
      context.getHandler(),
    );
    if (!definePolicy) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id as number;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }
    const userPolicies = await this.getUserPolicies(userId);

    if (!userPolicies) {
      throw new ForbiddenException('userPolicies not found');
    }

    const ability = this.defineAbilitiesFor(userPolicies);

    try {
      const { action, subject } = definePolicy;
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  defineAbilitiesFor(policies: Pick<Policy, 'action' | 'subject'>[]) {
    const { can, build } = new AbilityBuilder(createPrismaAbility);
    policies.forEach((policy) => {
      const { action, subject } = policy;
      can(action, subject);
    });
    return build();
  }
  async getUserPolicies(userId: number) {
    return await this.prisma.policy.findMany({
      where: {
        permissions: {
          some: {
            roles: {
              some: {
                positions: {
                  some: {
                    users: {
                      some: {
                        id: userId,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
        updatedAt: 'asc',
      },
      select: {
        action: true,
        subject: true,
      },
    });
  }
}
