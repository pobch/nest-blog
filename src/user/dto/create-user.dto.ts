import { Prisma } from '@prisma/client'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}
