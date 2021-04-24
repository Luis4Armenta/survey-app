import { IEncryptor } from '../../providers/IEncryptor'
import { IWebToken } from '../../providers/IWebToken'
import { IUserRepository } from '../../repositories/IUserRepository'

export class LoginUseCae {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encryptor: IEncryptor,
    private readonly tokenService: IWebToken
  ) { }

  async execute (username: string, password: string): Promise<LoginData | null> {
    if (username !== '' && password !== '') {
      const user = await this.userRepository.login(username)
      if (user !== null) {
        if (this.encryptor.compare(password, user.password)) {
          return {
            expiresIn: 2880,
            token: this.tokenService.sign(username)
          }
        } else {
          return null
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }
}

interface LoginData {
  token: string
  expiresIn: number
}
