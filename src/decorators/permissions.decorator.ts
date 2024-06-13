import { SetMetadata } from '@nestjs/common';

export const CHECK_PERMISSIONS_KEY = 'check_permissions';
export const CheckPermissions = (
  ...permissions: { action: string; subject: string }[]
) => SetMetadata(CHECK_PERMISSIONS_KEY, permissions);
