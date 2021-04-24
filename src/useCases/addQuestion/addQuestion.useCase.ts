import { IQuestion } from '../../models/Question'
import { IFormRepository } from '../../repositories/IFormRepository'

export class AddQuestionUseCase {
  constructor (private readonly formRepository: IFormRepository) { }

  async execute (formId: string, question: IQuestion): Promise<boolean> {
    if (formId !== '' && question.question !== '') {
      return await this.formRepository.addQuestion(formId, question)
    } else {
      return false
    }
  }
}
