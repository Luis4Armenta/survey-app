import { MongoDBFormRepository } from '../../repositories/implementations/MongoDBFormRepository'
import { DeleteFormUseCase } from './deleteForm.useCase'

const formRepository = new MongoDBFormRepository()
const deleteFormUseCase = new DeleteFormUseCase(formRepository)

export { deleteFormUseCase }
