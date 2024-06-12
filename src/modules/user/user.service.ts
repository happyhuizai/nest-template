import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as argon2 from 'argon2';

import type { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOneUser(user: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: user,
    });
  }

  async createUser(user: Prisma.UserCreateInput) {
    const password = await argon2.hash(user.password);
    return await this.prisma.user.create({
      data: {
        ...user,
        password,
      },
    });
  }
}
