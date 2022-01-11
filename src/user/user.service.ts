import { Prisma, User } from '@prisma/client'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as argon2 from 'argon2'
import { BadRequestError } from 'src/errors/BadRequestError'
import { LoginUserDto } from './dto/login-user.dto'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from 'src/configs/jwt-secret'
import { ROLE } from './types/role'
import { TUserProp } from './types/userProp'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<TUserProp> {
    const userNotUnique = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    })
    if (userNotUnique) {
      throw new BadRequestError(['email is already exist'])
    }

    const hashedPassword = await argon2.hash(createUserDto.password)

    const data = {
      email: createUserDto.email,
      password: hashedPassword,
      role: ROLE.BASIC,
    }

    const createdUser = await this.prisma.user.create({
      data: data,
      select: {
        id: true,
        email: true,
        role: true,
      },
    })
    return createdUser
  }

  async login(loginUserDto: LoginUserDto): Promise<TUserProp & { token: string }> {
    const userInDb = await this.prisma.user.findUnique({
      where: {
        email: loginUserDto.email,
      },
    })

    if (userInDb === null) {
      throw new UnauthorizedException('wrong email or password')
    }

    const isPasswordCorrect = await argon2.verify(userInDb.password, loginUserDto.password)

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('wrong email or password')
    }

    const token = generateJWT(userInDb)

    return { id: userInDb.id, email: userInDb.email, role: userInDb.role, token: token }
  }

  // findAll() {
  //   return `This action returns all user`
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}

function generateJWT(user: User): string {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 1)

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      exp: exp.getTime() / 1000,
      role: user.role,
    },
    JWT_SECRET
  )
}
