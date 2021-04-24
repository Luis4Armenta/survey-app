import { MongoDBFormRepository } from '../../repositories/implementations/MongoDBFormRepository'
import { GetFormUsecase } from './getForm.useCase'

const formRepository = new MongoDBFormRepository()
const getFormUseCase = new GetFormUsecase(formRepository)

export { getFormUseCase }
