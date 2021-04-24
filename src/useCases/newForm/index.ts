import { MongoDBFormRepository } from '../../repositories/implementations/MongoDBFormRepository'
import { NewFormUseCase } from './newForm.useCase'

const formRepository = new MongoDBFormRepository()
const newFormUseCase = new NewFormUseCase(formRepository)

export { newFormUseCase }
