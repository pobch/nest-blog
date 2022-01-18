import { Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { BadRequestError } from 'src/errors/BadRequestError'
import { PrismaService } from 'src/prisma.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

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

  async remove(id: number) {
    try {
      const deletedArticle = await this.prisma.article.delete({
        where: {
          id,
        },
      })
      return deletedArticle
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new BadRequestError(['the article is not exist'])
      }
      throw e
    }
  }

  async findAllByAuthorId(authorId: number) {
    const articles = await this.prisma.article.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: { select: { id: true, email: true } },
      },
    })

    return articles
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.update({ where: { id: id }, data: updateArticleDto })
    return article
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} article`
  // }
}
