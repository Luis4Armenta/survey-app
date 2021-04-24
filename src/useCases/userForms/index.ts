import { MongoDBUserRepository } from '../../repositories/implementations/MongoDBUserRepository'
import { UserForms } from './userForms.useCase'

const userRepository = new MongoDBUserRepository()

const userFormsUseCase = new UserForms(userRepository)

export { userFormsUseCase }
