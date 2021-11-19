import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, authorId: number) {
    const article = await this.prisma.article.create({
      data: {
        ...createArticleDto,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

    return { ...article }
  }

  async findAll() {
    const articles = await this.prisma.article.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

    return articles
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} article`
  // }

  // update(id: number, updateArticleDto: UpdateArticleDto) {
  //   return `This action updates a #${id} article`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} article`
  // }
}