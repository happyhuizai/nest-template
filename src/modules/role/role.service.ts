import { Inject, Injectable } from '@nestjs/common';

import { CustomPrisma } from '../../shared/prisma.extension';

import type {
  CreateRoleReqDto,
  FindAllRoleReqDto,
  UpdateRoleReqDto,
} from './dto/role-req.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrisma,
  ) {}
  create(createRoleReqDto: CreateRoleReqDto) {
    return this.prisma.client.role.create({
      data: createRoleReqDto,
    });
  }

  async findAll(findAllRoleReqDto: FindAllRoleReqDto) {
    const { name, ...other } = findAllRoleReqDto;
    const [items, meta] = await this.prisma.client.role
      .paginate({
        where: {
          name,
        },
      })
      .withPages(other);
    const { currentPage, totalCount } = meta;
    return {
      items,
      currentPage,
      totalCount,
    };
  }

  findOne(id: number) {
    return this.prisma.client.role.findUnique({
      where: {
        id,
      },
    });
  }

  async update(roleId: number, updateRoleDto: UpdateRoleReqDto) {
    return this.prisma.client.role.update({
      where: {
        id: roleId,
      },
      data: updateRoleDto,
    });
  }

  async remove(roleId: number) {
    return this.prisma.client.role.delete({
      where: {
        id: roleId,
      },
    });
  }
}
