import { FormRepository } from '../../_test_/useCases/utils/form.mocks'
import { AddQuestionUseCase } from './addQuestion.useCase'

const formRepository = new FormRepository()
const addQuestionUseCase = new AddQuestionUseCase(formRepository)

export { addQuestionUseCase }
