import { DeleteFormUseCase } from '../../../useCases/deleteForm/deleteForm.useCase'
import { FormRepository } from '../utils/form.mocks'
import { UserRepository } from '../utils/user.mocks'

describe('delete form use case', () => {
  const userRepository = new UserRepository()
  const formRepository = new FormRepository()
  const useCase = new DeleteFormUseCase(formRepository, userRepository)

  const userId = 'u1'
  const formId = 'f1'
  beforeEach(async () => {
    const form = {
      name: 'form',
      questions: [],
      _id: 'f1',
      owner: 'u1'
    }
    userRepository.users.push({
      username: 'mr.cat',
      password: 'password',
      _id: 'u1',
      forms: [form]
    })
    formRepository.forms.push(form)
  })
  afterEach(() => {
    formRepository.forms = []
    userRepository.users = []
  })

  it('debe retornar un valor boolean', async () => {
    const resp = await useCase.execute(userId, formId)
    expect(typeof resp).toStrictEqual('boolean')
  })
  it('debe retornar false si no se da un id', async () => {
    const resp = await useCase.execute('', '')
    expect(resp).toBeFalsy()
  })
  it('si se no se encuentra el componente en sistema debe retornar false', async () => {
    const resp = await useCase.execute(userId, '82')
    expect(resp).toBeFalsy()
  })
  it('si encuentra el id debe eliminarlo del sistema y retornar true', async () => {
    const resp = await useCase.execute(userId, formId)
    expect(resp).toBeTruthy()
    expect(formRepository.forms.length).toBe(0)
  })
})
