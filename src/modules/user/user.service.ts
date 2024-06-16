import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { CustomPrisma } from '../../shared/prisma.extension';

import type { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrisma,
  ) {}

  findOneUser(user: Prisma.UserWhereUniqueInput) {
    return this.prisma.client.user.findUnique({
      where: user,
    });
  }

  async createUser(user: Prisma.UserCreateInput) {
    const password = await argon2.hash(user.password);
    return await this.prisma.client.user.create({
      data: {
        ...user,
        password,
      },
    });
  }
}
