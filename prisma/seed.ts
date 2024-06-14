import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

import { fakeUser } from './fake-data';

const prisma = new PrismaClient();
async function main() {
  const password = await argon2.hash('Admin123');
  const user = fakeUser();
  await prisma.user.create({
    data: {
      ...user,
      password,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
