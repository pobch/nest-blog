import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserProp = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user as { id: number; email: string }
})
