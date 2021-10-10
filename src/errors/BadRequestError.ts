import { BadRequestException, HttpStatus } from '@nestjs/common'

export class BadRequestError extends BadRequestException {
  constructor(errors: string[]) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Bad Request',
      errors: errors,
    })
  }
}
