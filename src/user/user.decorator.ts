import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TUserProp } from './types/userProp'

export const UserProp = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user as TUserProp
})
