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
import { Prisma, Role } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class RoleCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.RoleFindManyArgs,
  ): Promise<Result<PaginationModel<Role>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.role.findMany(filter),
        this.prismaService.role.count({ where: filter?.where }),
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
        new InternalServerErrorException(`Could not get Role Resources.`),
      );
    }
  }

  async getById(id: string): Promise<Result<Role, Error>> {
    try {
      const result = await this.prismaService.role.findUniqueOrThrow({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(new NotFoundException(`Role Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.RoleCreateInput): Promise<Result<Role, Error>> {
    try {
      const result = await this.prismaService.role.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(`Could not create Role Resource.`),
      );
    }
  }

  async update(
    id: string,
    data: Prisma.RoleUpdateInput,
  ): Promise<Result<Role, Error>> {
    try {
      const result = await this.prismaService.role.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update Role Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: string): Promise<Result<Role, Error>> {
    try {
      const result = await this.prismaService.role.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete Role Resource ${id}.`,
        ),
      );
    }
  }
}