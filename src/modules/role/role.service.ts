import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import type { CreateRoleDto } from './dto/create-role.dto';
import type { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  findAll() {
    return this.prisma.rule.findMany();
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async update(userId: number, roleId: number, updateRoleDto: UpdateRoleDto) {
    await this.userHasRole(userId, roleId);
    this.prisma.role.update({
      where: {
        id: roleId,
      },
      data: updateRoleDto,
    });
  }

  async remove(userId: number, roleId: number) {
    await this.userHasRole(userId, roleId);
    return this.prisma.role.delete({
      where: {
        id: roleId,
      },
    });
  }
  async findUserRole(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        groups: {
          include: {
            group: {
              include: {
                roles: true,
              },
            },
          },
        },
      },
    });
  }
  async userHasRole(userId: number, roleId: number): Promise<boolean> {
    const user = await this.findUserRole(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const roles = user.groups.flatMap((group) =>
      group.group.roles.map((role) => role.id),
    );
    return roles.includes(roleId);
  }
}
