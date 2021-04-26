import { IFormRepository } from '../../repositories/IFormRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { hasAllTheParametersFilled } from '../../utils/helper'

export class DeleteFormUseCase {
  constructor (
    private readonly formRepository: IFormRepository,
    private readonly userRepository: IUserRepository
  ) { }

  async execute (userId: string, formId: string): Promise<boolean> {
    if (hasAllTheParametersFilled(formId)) {
      const res1 = await this.userRepository.deleteForm(userId, formId)
      const res2 = await this.formRepository.deleteForm(formId)

      if (res1 && res2) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
