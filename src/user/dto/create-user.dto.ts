import { Prisma } from '@prisma/client'

export class CreateUserDto implements Prisma.UserCreateInput {
  readonly email: string

  readonly password: string
}
