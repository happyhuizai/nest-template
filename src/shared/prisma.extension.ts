// prisma.extension.ts
import { PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';

import type { Prisma } from '@prisma/client';
import type { CustomPrismaService } from 'nestjs-prisma';

const prisma = new PrismaClient<
  Prisma.PrismaClientOptions,
  'query' | 'info' | 'warn' | 'error'
>({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

// pagination for all models
export const extendedPrismaClient = prisma.$extends(
  pagination({
    pages: {
      limit: 10,
      includePageCount: true,
    },
  }),
);

export type ExtendedPrismaClient = typeof extendedPrismaClient;
export type CustomPrisma = CustomPrismaService<ExtendedPrismaClient>;
