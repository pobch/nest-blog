import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestError } from './errors/BadRequestError'
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  app.useLogger(app.get(Logger))

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const formattedErrors = errors.flatMap((error) => {
          return Object.values(error.constraints ?? {})
        })

        return new BadRequestError(formattedErrors)
      },
      whitelist: true,
    })
  )

  await app.listen(8000)
}
bootstrap()
