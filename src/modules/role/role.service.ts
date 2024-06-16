import { Injectable } from '@nestjs/common';
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
    return this.prisma.role.findMany();
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: {
        id: roleId,
      },
      data: updateRoleDto,
    });
  }

  async remove(roleId: number) {
    return this.prisma.role.delete({
      where: {
        id: roleId,
      },
    });
  }
}
