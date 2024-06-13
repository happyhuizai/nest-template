// casl-guard.ts
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@prisma/client';
import { AppAbility, defineAbilityFor } from './casl-ability.factory';
import { ForbiddenError } from '@casl/ability';
import { CHECK_ABILITY } from './check-abilities.decorator';
import { RawRule } from '@casl/ability';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RawRule[]>(CHECK_ABILITY, context.getHandler());
    if (!rules) {
      return true; // 如果没有规则定义，允许访问
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id; // 假设用户信息存储在 request.user 中
    const resourceId = request.params.id; // 假设资源 ID 在路径参数中

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { rules: true }
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const ability = defineAbilityFor(user.rules);

    const resource = await this.prisma.resource.findUnique({
      where: { id: Number(resourceId) }
    });

    if (!resource) {
      throw new ForbiddenException('Resource not found');
    }

    try {
      rules.forEach(rule => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, resource);
      });
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
