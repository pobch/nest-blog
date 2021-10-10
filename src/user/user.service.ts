import { Prisma, User } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as argon2 from 'argon2'
import { BadRequestError } from 'src/errors/BadRequestError'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<{ email: string }> {
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
    }

    return this.prisma.user.create({
      data: data,
      select: {
        email: true,
      },
    })
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
