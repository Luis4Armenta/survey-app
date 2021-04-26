import { UserForms } from '../../../useCases/userForms/userForms.useCase'
import { UserRepository } from '../utils/user.mocks'

describe('get all forms from an user', () => {
  const userRepository = new UserRepository()
  const useCase = new UserForms(userRepository)
  beforeAll(async () => {
    await userRepository.register({ username: 'mr.cat', password: 'password' })
  })

  it('si no es pasado nungun argumento debe retornar un array vacío', async () => {
    const resp = await useCase.execute('')
    expect(resp).toStrictEqual([])
  })
  it('si es pasado un argumento valido debe retornar un arreglo ', async () => {
    const user = await userRepository.login('mr.cat')
    const resp = await useCase.execute('mr.cat')
    expect(resp).toStrictEqual(user?.forms)
  })
})
