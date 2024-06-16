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
import { Prisma, Policy } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class PolicyCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.PolicyFindManyArgs,
  ): Promise<Result<PaginationModel<Policy>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.policy.findMany(filter),
        this.prismaService.policy.count({ where: filter?.where }),
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
        new InternalServerErrorException(`Could not get Policy Resources.`),
      );
    }
  }

  async getById(id: string): Promise<Result<Policy, Error>> {
    try {
      const result = await this.prismaService.policy.findUniqueOrThrow({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(new NotFoundException(`Policy Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.PolicyCreateInput): Promise<Result<Policy, Error>> {
    try {
      const result = await this.prismaService.policy.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(`Could not create Policy Resource.`),
      );
    }
  }

  async update(
    id: string,
    data: Prisma.PolicyUpdateInput,
  ): Promise<Result<Policy, Error>> {
    try {
      const result = await this.prismaService.policy.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update Policy Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: string): Promise<Result<Policy, Error>> {
    try {
      const result = await this.prismaService.policy.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete Policy Resource ${id}.`,
        ),
      );
    }
  }
}
