import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import type { CreateMenuDto } from './dto/create-menu.dto';
import type { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  findAll() {
    return this.prisma.menu.findMany();
  }

  findOne(id: number) {
    return this.prisma.menu.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  remove(id: number) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}
