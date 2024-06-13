import { Injectable } from '@nestjs/common';
import { AbilityBuilder } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';

import type { ExtractSubjectType, InferSubjects } from '@casl/ability';
import type { User } from '@prisma/client';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async defineAbilitiesFor(user: User) {
    const permissions = await this.prisma.permission.findMany({
      where: { userId: user.id },
    });

    const { can, cannot, build } = new AbilityBuilder(PrismaAbility);

    permissions.forEach((permission) => {
      const { action, subject, fields, conditions } = permission;
      const parsedConditions = conditions ? JSON.parse(conditions) : {};
      if (fields && fields.length > 0) {
        can(action, subject, parsedConditions, { fields });
      } else {
        can(action, subject, parsedConditions);
      }
    });

    return build({
      detectSubjectType: (item) => item.constructor,
    });
  }
}
