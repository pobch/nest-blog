import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
} from '@nestjs/common'
import { AuthGuard } from 'src/user/auth.guard'
import { UserProp } from 'src/user/user.decorator'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('articles')
export class ArticleController {
  // private readonly logger = new Logger(ArticleController.name)

  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @UserProp() user: { id: number; email: string },
    @Body() createArticleDto: CreateArticleDto
  ) {
    const userId = user.id
    return this.articleService.create(createArticleDto, userId)
  }

  @Get()
  async findAll() {
    return this.articleService.findAll()
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }

  @Get('my-articles')
  @UseGuards(AuthGuard)
  async findAllOwn(@UserProp() user: { id: number; email: string }) {
    return this.articleService.findAllByAuthorId(user.id)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.articleService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articleService.update(+id, updateArticleDto)
  // }
}
