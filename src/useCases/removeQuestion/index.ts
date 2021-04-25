import { MongoDBFormRepository } from '../../repositories/implementations/MongoDBFormRepository'
import { RemoveQuestionUseCase } from './removeQuestion.useCase'

const formRepository = new MongoDBFormRepository()
const removeQuestionUseCase = new RemoveQuestionUseCase(formRepository)

export { removeQuestionUseCase }
