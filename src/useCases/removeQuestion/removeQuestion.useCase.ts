import { IFormRepository } from '../../repositories/IFormRepository'

export class RemoveQuestionUseCase {
  constructor (private readonly formRepository: IFormRepository) { }

  async execute (formId: string, questionNumber: number): Promise<boolean> {
    if (formId !== '' && questionNumber !== 0) {
      return await this.formRepository.removeQuestion(formId, questionNumber)
    } else {
      return false
    }
  }
}
