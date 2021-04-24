import { IForm } from '../../models/Form'
import { IUserRepository } from '../../repositories/IUserRepository'

export class UserForms {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (userId: string): Promise<IForm[]> {
    if (userId !== '') {
      return await this.userRepository.getForms(userId)
    } else {
      return []
    }
  }
}
