import { Inject, Injectable } from '@nestjs/common';

import { CustomPrisma } from '../../shared/prisma.extension';

import type { CreateGroupDto } from './dto/create-group.dto';
import type { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrisma,
  ) {}
  create(createGroupDto: CreateGroupDto) {
    return this.prisma.client.group.create({
      data: createGroupDto,
    });
  }

  findAll() {
    return this.prisma.client.group.findMany();
  }

  findOne(id: number) {
    return this.prisma.client.group.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.prisma.client.group.update({
      where: {
        id,
      },
      data: updateGroupDto,
    });
  }

  remove(id: number) {
    return this.prisma.client.group.delete({
      where: {
        id,
      },
    });
  }
}
