import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { MongoDBUserRepository } from '../../repositories/implementations/MongoDBUserRepository'
import { CreateUserUseCase } from './createUser.useCase'

const userRepository = new MongoDBUserRepository()

const encryptor = new BcryptEncryptor()

const createUser = new CreateUserUseCase(userRepository, encryptor)

export { createUser }
