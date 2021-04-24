import { IForm } from '../../models/Form'
import { IFormRepository } from '../../repositories/IFormRepository'

export class GetFormUsecase {
  constructor (private readonly formRepository: IFormRepository) { }

  async execute (formId: string): Promise<IForm | null> {
    if (formId !== '') {
      return await this.formRepository.getForm(formId)
    } else {
      return null
    }
  }
}
