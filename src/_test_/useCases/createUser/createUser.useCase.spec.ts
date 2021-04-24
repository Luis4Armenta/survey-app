import { CreateUserUseCase } from '../../../useCases/createUser/createUser.useCase'
import { encryptor } from '../utils/encryptor.mocks'
import { UserRepository } from '../utils/user.mocks'

describe('Create user use case', () => {
  const userRepository = new UserRepository()
  const useCase = new CreateUserUseCase(userRepository, encryptor)

  it('debe retornar un boolean', async () => {
    const resp = await useCase.execute({ username: 'mr.cat', password: 'password' })
    expect(typeof resp).toBeTruthy()
  })
  it('si algun campo se encuentra vacío debe retornar false', async () => {
    const resp = await useCase.execute({ username: '', password: '' })
    expect(resp).toBeFalsy()
  })
  it('si se ejecuta exitorsamente debe existir un nuevo objeto en el repositorio de usuarios', async () => {
    const resp = await useCase.execute({ username: 'mr.cat', password: 'password' })
    expect(resp).toBeTruthy()
    expect(userRepository.users.length).not.toBe(0)
  })
  it('la contraseña debe ser cifrada y almacenada', async () => {
    const data = {
      username: 'mr.cat',
      password: 'password'
    }
    const resp = await useCase.execute(data)
    expect(resp).toBeTruthy()
    expect(userRepository.users.length).not.toBe(0)
    expect(userRepository.users[0].password).not.toBe(data.password)
  })
})
