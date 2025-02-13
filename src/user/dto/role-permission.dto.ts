import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class RolePermissionDto {
  @IsOptional()
  @IsEnum(Role, { each: true, message: 'Role must be either USER or ADMIN' })
  roles?: Role[];

  permissions?: string[];
}
