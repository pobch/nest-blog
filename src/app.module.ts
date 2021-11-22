import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ArticleModule } from './article/article.module'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    UserModule,
    ArticleModule,
    LoggerModule.forRoot({
      pinoHttp: {
        // transport: { target: 'pino-pretty' },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
