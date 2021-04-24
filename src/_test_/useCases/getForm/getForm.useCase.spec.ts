import { GetFormUsecase } from '../../../useCases/getForm/getForm.useCase'
import { FormRepository } from '../utils/form.mocks'

describe('get form by id', () => {
  const formRepository = new FormRepository()
  const useCase = new GetFormUsecase(formRepository)

  beforeAll(async () => {
    formRepository.forms.push({
      _id: '1',
      name: 'Form',
      questions: []
    })
  })

  it('debe retornar null el parametro está vacío', async () => {
    const resp = await useCase.execute('')
    expect(resp).toBeNull()
  })

  it('debe retorar un formulario', async () => {
    const resp = await useCase.execute('1')
    expect(resp).not.toBeNull()
    expect(resp).toBe(formRepository.forms[0])
  })
})
