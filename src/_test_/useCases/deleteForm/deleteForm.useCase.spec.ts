import { DeleteFormUseCase } from '../../../useCases/deleteForm/deleteForm.useCase'
import { FormRepository } from '../utils/form.mocks'

describe('delete form use case', () => {
  const formRepository = new FormRepository()
  const useCase = new DeleteFormUseCase(formRepository)

  beforeEach(async () => {
    formRepository.forms = []
    formRepository.forms.push({ name: 'form', questions: [], _id: '1' })
  })

  it('debe retornar un valor boolean', async () => {
    const resp = await useCase.execute('1')
    expect(typeof resp).toStrictEqual('boolean')
  })
  it('debe retornar false si no se da un id', async () => {
    const resp = await useCase.execute('')
    expect(resp).toBeFalsy()
  })
  it('si se no se encuentra el componente en sistema debe retornar false', async () => {
    const resp = await useCase.execute('82')
    expect(resp).toBeFalsy()
  })
  it('si encuentra el id debe eliminarlo del sistema y retornar true', async () => {
    const resp = await useCase.execute('1')
    expect(resp).toBeTruthy()
    expect(formRepository.forms.length).toBe(0)
  })
})
