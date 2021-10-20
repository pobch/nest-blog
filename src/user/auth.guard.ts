import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from 'src/configs/jwt-secret'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request?.headers?.authorization?.split?.(' ')?.[1]
    if (!token) {
      throw new ForbiddenException('access token is required')
    }

    let decodedToken: jwt.JwtPayload
    try {
      decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
    } catch (e) {
      throw new ForbiddenException(e.message)
    }

    request.user = {
      id: decodedToken.id,
      email: decodedToken.email,
    }

    return true
  }
}
