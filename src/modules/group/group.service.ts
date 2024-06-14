import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import type { CreateGroupDto } from './dto/create-group.dto';
import type { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}
  create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({
      data: createGroupDto,
    });
  }

  findAll() {
    return this.prisma.group.findMany();
  }

  findOne(id: number) {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.prisma.group.update({
      where: {
        id,
      },
      data: updateGroupDto,
    });
  }

  remove(id: number) {
    return this.prisma.group.delete({
      where: {
        id,
      },
    });
  }
}
