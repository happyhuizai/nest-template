import { Inject, Injectable } from '@nestjs/common';
import { CustomPrisma } from 'src/shared/prisma.extension';

import type {
  CreatePositionReqDto,
  FindAllPositionReqDto,
  UpdatePositionResDto,
} from './dto/position.req.dto';

@Injectable()
export class PositionService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrisma,
  ) {}

  async create(data: CreatePositionReqDto) {
    try {
      return await this.prisma.client.position.create({
        data,
      });
    } catch (error) {
      throw new Error(`Failed to create position: ${error.message}`);
    }
  }

  async findAll(query: FindAllPositionReqDto) {
    try {
      const { name, ...other } = query;
      const [items, meta] = await this.prisma.client.position
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
      throw new Error(`Failed to find all positions: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.client.position.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to find position with id ${id}: ${error.message}`,
      );
    }
  }

  async update(id: number, data: UpdatePositionResDto) {
    try {
      await this.prisma.client.position.update({
        where: {
          id,
        },
        data,
      });
      return { success: true };
    } catch (error) {
      throw new Error(
        `Failed to update position with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.client.position.update({
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
        `Failed to remove position with id ${id}: ${error.message}`,
      );
    }
  }
}
