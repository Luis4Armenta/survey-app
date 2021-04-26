import { IEncryptor } from '../../providers/IEncryptor'
import { IUserRepository } from '../../repositories/IUserRepository'
import { hasAllTheParametersFilled } from '../../utils/helper'
import { CreateUserDTO } from './createUserDTO'

export class CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encryptor: IEncryptor
  ) { }

  async execute (data: CreateUserDTO): Promise<boolean> {
    if (hasAllTheParametersFilled(data.username, data.password)) {
      const encryptedPassword = this.encryptor.encrypt(data.password)
      return await this.userRepository.register({ username: data.username, password: encryptedPassword })
    } else {
      return false
    }
  }
}
