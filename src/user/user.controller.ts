import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from './auth.guard'
import { UserProp } from './user.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<{ email: string }> {
    return this.userService.create(createUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ email: string; token: string }> {
    return this.userService.login(loginUserDto)
  }

  @Get('me')
  @UseGuards(AuthGuard)
  findMe(@UserProp() user: { id: number; email: string }) {
    return user
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
