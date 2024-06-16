import { SetMetadata, applyDecorators } from '@nestjs/common';

import type { ClassConstructor } from 'class-transformer';

export const SERIALIZE_KEY = 'Serialize';
export function Serialize(dto: ClassConstructor<unknown>) {
  return applyDecorators(SetMetadata(SERIALIZE_KEY, dto));
}
