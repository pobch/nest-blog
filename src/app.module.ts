import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ArticleModule } from './article/article.module'
import { LoggerModule } from 'nestjs-pino'
import * as path from 'path'

@Module({
  imports: [
    UserModule,
    ArticleModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: { translateTime: true },
            },
            {
              target: 'pino/file',
              options: { destination: path.join(__dirname, 'log.log') },
            },
          ],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
