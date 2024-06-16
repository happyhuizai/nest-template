import { Inject, Injectable } from '@nestjs/common';
import { CustomPrisma } from 'src/shared/prisma.extension';

import type {
  CreateRoleReqDto,
  FindAllRoleReqDto,
  UpdateRoleResDto,
} from './dto/role.req.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrisma,
  ) {}

  async create(data: CreateRoleReqDto) {
    try {
      return await this.prisma.client.role.create({
        data,
      });
    } catch (error) {
      throw new Error(`Failed to create role: ${error.message}`);
    }
  }

  async findAll(query: FindAllRoleReqDto) {
    try {
      const { name, ...other } = query;
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
    } catch (error) {
      throw new Error(`Failed to find all roles: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.client.role.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(`Failed to find role with id ${id}: ${error.message}`);
    }
  }

  async update(id: number, data: UpdateRoleResDto) {
    try {
      await this.prisma.client.role.update({
        where: {
          id,
        },
        data,
      });
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update role with id ${id}: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.client.role.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
        },
      });
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to remove role with id ${id}: ${error.message}`);
    }
  }
}
