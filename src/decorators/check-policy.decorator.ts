import { SetMetadata } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

export const POLICY_KEY = 'Policy';
export type CheckPolicyParams = {
  action: Prisma.PrismaAction;
  subject: Prisma.ModelName;
};
export const CheckPolicy = (policy: CheckPolicyParams) =>
  SetMetadata(POLICY_KEY, policy);
