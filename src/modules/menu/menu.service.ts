import { Inject, Injectable } from '@nestjs/common';

import { CustomPrisma } from '../../shared/prisma.extension';

import type { CreateMenuDto } from './dto/create-menu.dto';
import type { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrisma,
  ) {}
  create(createMenuDto: CreateMenuDto) {
    return this.prisma.client.menu.create({
      data: createMenuDto,
    });
  }

  findAll() {
    return this.prisma.client.menu.findMany();
  }

  findOne(id: number) {
    return this.prisma.client.menu.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.prisma.client.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  remove(id: number) {
    return this.prisma.client.menu.delete({
      where: { id },
    });
  }
}
