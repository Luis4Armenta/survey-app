import { Response, Request } from 'express'
import { LoginUseCae } from './login.useCase'

export class LoginController {
  constructor (private readonly loginUseCase: LoginUseCae) { }

  async hanlde (request: Request, response: Response): Promise<Response> {
    return await this.loginUseCase.execute(request.body.username, request.body.password)
      .then(res => {
        if (res !== null) {
          return response.status(200).json(res)
        } else {
          return response.status(200).json({
            token: 'login error',
            expiresIn: 0
          })
        }
      })
      .catch(() => response.status(200).json({
        token: 'login error',
        expiresIn: 0
      }))
  }
}
