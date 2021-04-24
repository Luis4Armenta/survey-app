import { IFormRepository } from '../../repositories/IFormRepository'

export class DeleteFormUseCase {
  constructor (private readonly formRepository: IFormRepository) { }

  async execute (formId: string): Promise<boolean> {
    if (formId !== '') {
      return await this.formRepository.deleteForm(formId)
    } else {
      return false
    }
  }
}
