import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestError } from './errors/BadRequestError'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const formattedErrors = errors.flatMap((error) => {
          return Object.values(error.constraints)
        })

        return new BadRequestError(formattedErrors)
      },
    })
  )

  await app.listen(8000)
}
bootstrap()
