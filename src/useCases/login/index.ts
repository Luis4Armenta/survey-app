import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { MongoDBUserRepository } from '../../repositories/implementations/MongoDBUserRepository'
import { LoginUseCae } from './login.useCase'

const userRepository = new MongoDBUserRepository()
const encryptor = new BcryptEncryptor()

const tokenService = new JsonWebToken()

const loginUseCase = new LoginUseCae(userRepository, encryptor, tokenService)

export { loginUseCase }
