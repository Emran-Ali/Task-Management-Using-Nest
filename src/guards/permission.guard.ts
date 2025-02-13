import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const isAdmin = user.roles?.includes('ADMIN');
    console.log(isAdmin, 'is admin', user, 'User from Permission Guard');
    return (
      isAdmin ||
      requiredPermissions.some((permission) =>
        user.permissions?.includes(permission),
      )
    );
  }
}
