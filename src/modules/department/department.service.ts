import { Inject, Injectable } from '@nestjs/common';
import { CustomPrisma } from 'src/shared/prisma.extension';

import type {
  CreateDepartmentReqDto,
  FindAllDepartmentReqDto,
  UpdateDepartmentResDto,
} from './dto/department.req.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrisma,
  ) {}

  async create(data: CreateDepartmentReqDto) {
    try {
      return await this.prisma.client.department.create({
        data,
      });
    } catch (error) {
      throw new Error(`Failed to create department: ${error.message}`);
    }
  }

  async findAll(query: FindAllDepartmentReqDto) {
    try {
      const { name, ...other } = query;
      const [items, meta] = await this.prisma.client.department
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
      throw new Error(`Failed to find all departments: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.client.department.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to find department with id ${id}: ${error.message}`,
      );
    }
  }

  async update(id: number, data: UpdateDepartmentResDto) {
    try {
      await this.prisma.client.department.update({
        where: {
          id,
        },
        data,
      });
      return { success: true };
    } catch (error) {
      throw new Error(
        `Failed to update department with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.client.department.update({
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
        `Failed to remove department with id ${id}: ${error.message}`,
      );
    }
  }
}
