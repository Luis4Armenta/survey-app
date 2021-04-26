import { IQuestion } from '../../models/Question'
import { IFormRepository } from '../../repositories/IFormRepository'
import { hasAllTheParametersFilled } from '../../utils/helper'

export class AddQuestionUseCase {
  constructor (private readonly formRepository: IFormRepository) { }

  async execute (formId: string, question: IQuestion): Promise<boolean> {
    if (hasAllTheParametersFilled(formId)) {
      return await this.formRepository.addQuestion(formId, question)
    } else {
      return false
    }
  }
}
