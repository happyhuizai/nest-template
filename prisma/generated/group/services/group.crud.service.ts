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
import { Prisma, Group } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class GroupCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.GroupFindManyArgs,
  ): Promise<Result<PaginationModel<Group>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.group.findMany(filter),
        this.prismaService.group.count({ where: filter?.where }),
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
        new InternalServerErrorException(`Could not get Group Resources.`),
      );
    }
  }

  async getById(id: string): Promise<Result<Group, Error>> {
    try {
      const result = await this.prismaService.group.findUniqueOrThrow({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(new NotFoundException(`Group Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.GroupCreateInput): Promise<Result<Group, Error>> {
    try {
      const result = await this.prismaService.group.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(`Could not create Group Resource.`),
      );
    }
  }

  async update(
    id: string,
    data: Prisma.GroupUpdateInput,
  ): Promise<Result<Group, Error>> {
    try {
      const result = await this.prismaService.group.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update Group Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: string): Promise<Result<Group, Error>> {
    try {
      const result = await this.prismaService.group.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete Group Resource ${id}.`,
        ),
      );
    }
  }
}
