// // casl-guard.ts
// import { Injectable, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ForbiddenError } from '@casl/ability';
// import { CheckPermissions } from 'src/decorators/check-permissions.decorator';
// import { PrismaService } from 'nestjs-prisma';

// import type { CanActivate, ExecutionContext } from '@nestjs/common';
// import type { RawRule } from '@casl/ability';

// @Injectable()
// export class CaslGuard implements CanActivate {
//   constructor(private reflector: Reflector, private prisma: PrismaService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const rules = this.reflector.get<RawRule[]>(
//       CheckPermissions,
//       context.getHandler(),
//     );
//     if (!rules) {
//       return true; // 如果没有规则定义，允许访问
//     }

//     const request = context.switchToHttp().getRequest();
//     const userId = request.user?.id as number; // 假设用户信息存储在 request.user 中
//     const resourceId = request.params.id; // 假设资源 ID 在路径参数中

//     if (!userId) {
//       throw new ForbiddenException('User not authenticated');
//     }

//     const user = await this.prisma.group.findMany({
//       where: {
//         users: {
//           every: {
//             userId,
//           },
//         },
//       },
//       include: {
//         roles: {
//           include: {
//             role: {
//               include: {
//                 permissions: {
//                   include: {
//                     permission: {
//                       include: {
//                         rules: true,
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!user) {
//       throw new ForbiddenException('User not found');
//     }

//     const ability = this.defineAbilitiesFor(user.rules);

//     const resource = await this.prisma.resource.findUnique({
//       where: { id: Number(resourceId) },
//     });

//     if (!resource) {
//       throw new ForbiddenException('Resource not found');
//     }

//     try {
//       rules.forEach((rule) => {
//         ForbiddenError.from(ability).throwUnlessCan(rule.action, resource);
//       });
//       return true;
//     } catch (error) {
//       throw new ForbiddenException(error.message);
//     }
//   }
//   async defineAbilitiesFor(user: User) {
//     const permissions = await this.prisma.permission.findMany({
//       where: { userId: user.id },
//     });

//     const { can, cannot, build } = new AbilityBuilder(PrismaAbility);

//     permissions.forEach((permission) => {
//       const { action, subject, fields, conditions } = permission;
//       const parsedConditions = conditions ? JSON.parse(conditions) : {};
//       if (fields && fields.length > 0) {
//         can(action, subject, parsedConditions, { fields });
//       } else {
//         can(action, subject, parsedConditions);
//       }
//     });

//     return build({
//       detectSubjectType: (item) => item.constructor,
//     });
//   }
// }
