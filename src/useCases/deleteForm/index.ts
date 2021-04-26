import { MongoDBFormRepository } from '../../repositories/implementations/MongoDBFormRepository'
import { MongoDBUserRepository } from '../../repositories/implementations/MongoDBUserRepository'
import { DeleteFormUseCase } from './deleteForm.useCase'

const formRepository = new MongoDBFormRepository()
const userRepository = new MongoDBUserRepository()
const deleteFormUseCase = new DeleteFormUseCase(formRepository, userRepository)

export { deleteFormUseCase }
