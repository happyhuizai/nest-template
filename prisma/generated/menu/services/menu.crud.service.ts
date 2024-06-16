/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Menu } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class MenuCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.MenuFindManyArgs,
  ): Promise<Result<PaginationModel<Menu>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.menu.findMany(filter),
        this.prismaService.menu.count({ where: filter?.where }),
      ]);

      const take = filter?.take ? filter?.take : count;
      const skip = filter?.skip ? filter?.skip : 0;

      return ok({
        items: items,
        meta: {
          totalItems: count,
          items: items.length,
          totalPages: Math.ceil(count / take),
          page: skip / take + 1,
        },
      });
    } catch (e) {
      return err(
        new InternalServerErrorException(`Could not get Menu Resources.`),
      );
    }
  }

  async getById(id: string): Promise<Result<Menu, Error>> {
    try {
      const result = await this.prismaService.menu.findUniqueOrThrow({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(new NotFoundException(`Menu Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.MenuCreateInput): Promise<Result<Menu, Error>> {
    try {
      const result = await this.prismaService.menu.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(`Could not create Menu Resource.`),
      );
    }
  }

  async update(
    id: string,
    data: Prisma.MenuUpdateInput,
  ): Promise<Result<Menu, Error>> {
    try {
      const result = await this.prismaService.menu.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update Menu Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: string): Promise<Result<Menu, Error>> {
    try {
      const result = await this.prismaService.menu.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete Menu Resource ${id}.`,
        ),
      );
    }
  }
}
