import { Request, Response } from 'express'
import { CreateUserUseCase } from './createUser.useCase'

export class CreateUserController {
  constructor (private readonly registerUserUseCase: CreateUserUseCase) { }

  async hanlde (request: Request, response: Response): Promise<Response> {
    const username = request.body.username
    const password = request.body.password
    console.log('desde controller', request.body)
    const resp = await this.registerUserUseCase.execute({ username: username, password: password })

    if (resp) {
      return response.status(200).json({ message: 'user created' })
    } else {
      return response.status(200).json({ message: 'the user was not created' })
    }
  }
}
