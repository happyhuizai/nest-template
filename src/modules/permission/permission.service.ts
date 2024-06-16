import { Inject, Injectable } from '@nestjs/common';
import { CustomPrisma } from 'src/shared/prisma.extension';

import type {
  CreatePermissionReqDto,
  FindAllPermissionReqDto,
  UpdatePermissionResDto,
} from './dto/permission.req.dto';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrisma,
  ) {}

  async create(data: CreatePermissionReqDto) {
    try {
      return await this.prisma.client.permission.create({
        data,
      });
    } catch (error) {
      throw new Error(`Failed to create permission: ${error.message}`);
    }
  }

  async findAll(query: FindAllPermissionReqDto) {
    try {
      const { name, ...other } = query;
      const [items, meta] = await this.prisma.client.permission
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
      throw new Error(`Failed to find all permissions: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.client.permission.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to find permission with id ${id}: ${error.message}`,
      );
    }
  }

  async update(id: number, data: UpdatePermissionResDto) {
    try {
      await this.prisma.client.permission.update({
        where: {
          id,
        },
        data,
      });
      return { success: true };
    } catch (error) {
      throw new Error(
        `Failed to update permission with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.client.permission.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
        },
      });
      return { success: true };
    } catch (error) {
      throw new Error(
        `Failed to remove permission with id ${id}: ${error.message}`,
      );
    }
  }
}
