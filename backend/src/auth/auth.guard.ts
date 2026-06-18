import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') || [];
    if (!type || type !== 'Bearer') {
      throw new Error('Invalid token type');
    }
    if (!token) {
      throw new Error('No token provided');
    }
    return true;
  }
}
