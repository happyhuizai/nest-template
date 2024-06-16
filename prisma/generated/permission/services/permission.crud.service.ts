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
import { Prisma, Permission } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class PermissionCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.PermissionFindManyArgs,
  ): Promise<Result<PaginationModel<Permission>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.permission.findMany(filter),
        this.prismaService.permission.count({ where: filter?.where }),
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
        new InternalServerErrorException(`Could not get Permission Resources.`),
      );
    }
  }

  async getById(id: string): Promise<Result<Permission, Error>> {
    try {
      const result = await this.prismaService.permission.findUniqueOrThrow({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new NotFoundException(`Permission Resource ${id} was not found.`),
      );
    }
  }

  async create(
    data: Prisma.PermissionCreateInput,
  ): Promise<Result<Permission, Error>> {
    try {
      const result = await this.prismaService.permission.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not create Permission Resource.`,
        ),
      );
    }
  }

  async update(
    id: string,
    data: Prisma.PermissionUpdateInput,
  ): Promise<Result<Permission, Error>> {
    try {
      const result = await this.prismaService.permission.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update Permission Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: string): Promise<Result<Permission, Error>> {
    try {
      const result = await this.prismaService.permission.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete Permission Resource ${id}.`,
        ),
      );
    }
  }
}
