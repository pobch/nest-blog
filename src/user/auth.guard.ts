import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from 'src/configs/jwt-secret'
import { TUserProp } from './types/userProp'

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
      if (e instanceof Error) {
        throw new ForbiddenException(e.message)
      }
      // ! Should not reach here
      throw e
    }

    request.user = {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    } as TUserProp

    return true
  }
}
