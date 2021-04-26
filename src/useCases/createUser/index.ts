import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { MongoDBUserRepository } from '../../repositories/implementations/MongoDBUserRepository'
import { CreateUserController } from './createUser.controller'
import { CreateUserUseCase } from './createUser.useCase'

const userRepository = new MongoDBUserRepository()

const encryptor = new BcryptEncryptor()

const createUser = new CreateUserUseCase(userRepository, encryptor)
const createUserController = new CreateUserController(createUser)

export { createUser, createUserController }
