import { IEncryptor } from '../../providers/IEncryptor'
import { IUserRepository } from '../../repositories/IUserRepository'
import { CreateUserDTO } from './createUserDTO'

export class CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encryptor: IEncryptor
  ) { }

  async execute (data: CreateUserDTO): Promise<boolean> {
    if (data.username !== '' && data.password !== '') {
      const encryptedPassword = this.encryptor.encrypt(data.password)
      return await this.userRepository.register(data.username, encryptedPassword)
    } else {
      return false
    }
  }
}
