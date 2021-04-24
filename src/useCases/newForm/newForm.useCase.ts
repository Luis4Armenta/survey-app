import { IForm } from '../../models/Form'
import { IFormRepository } from '../../repositories/IFormRepository'

export class NewFormUseCase {
  constructor (private readonly formRepository: IFormRepository) { }

  async execute (data: IForm): Promise<string> {
    if (data.name !== '') {
      return await this.formRepository.newForm(data)
    } else {
      return ''
    }
  }
}
