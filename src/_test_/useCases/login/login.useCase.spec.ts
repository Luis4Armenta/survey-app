import { JsonWebToken } from '../../../providers/implementations/JsonWebToken'
import { LoginUseCae } from '../../../useCases/login/login.useCase'
import { encryptor } from '../utils/encryptor.mocks'
import { UserRepository } from '../utils/user.mocks'

describe('login use case', () => {
  const userRepository = new UserRepository()
  const useCase = new LoginUseCae(userRepository, encryptor, new JsonWebToken())

  afterEach(() => {
    userRepository.users = []
  })
  it('No debe retornar información de login si el usuario está en blanco', async () => {
    const resp = await useCase.execute('', '')
    expect(resp).toBeNull()
  })
  it('si no se encuentra el usuario debe retornar null', async () => {
    await userRepository.register({ username: 'mr.cat', password: 'password' })
    const resp = await useCase.execute('sr.dog', 'password')
    expect(resp).toBeNull()
  })
  it('si la contraseña del usuario encontrado no conicide con la dada retorna null', async () => {
    await userRepository.register({ username: 'mr.cat', password: encryptor.encrypt('password') })
    const resp = await useCase.execute('mr.cat', 'password4')
    expect(resp).toBeNull()
  })
  it('si la contraseña del usuario coincide debe retornar un objeto con el token y una fecha de caducidad', async () => {
    const user = 'mr.cat'
    const password = 'password'
    await userRepository.register({ username: user, password: encryptor.encrypt(password) })
    const resp = await useCase.execute(user, password)
    expect(resp).not.toBeNull()
    expect(resp?.token).toBeTruthy()
    expect(resp?.expiresIn).toBeTruthy()
  })
})
