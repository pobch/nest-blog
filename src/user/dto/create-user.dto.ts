import { Prisma } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}
