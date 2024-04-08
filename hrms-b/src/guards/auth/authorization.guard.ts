import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleType } from 'src/enums/role-type.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    } else {
      const request = context.switchToHttp().getRequest<Request>();
      const status = requiredRoles.includes(request['employee']?.employee?.roleType);

      if (status) {
        return true;
      } else {
        throw new ForbiddenException('you are not allowed to use this resource');
      }
    }
  }
}
