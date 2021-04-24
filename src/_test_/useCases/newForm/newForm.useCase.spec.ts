import { NewFormUseCase } from '../../../useCases/newForm/newForm.useCase'
import { FormRepository } from '../utils/form.mocks'

describe(' Crear nuevo formulario - caso de uso', () => {
  const formRepository = new FormRepository()
  const useCase = new NewFormUseCase(formRepository)

  it('el resultado devuelto debe de ser boolean', async () => {
    const resp = await useCase.execute({ name: 'form', questions: [] })
    expect(typeof resp).toStrictEqual('string')
  })
  it('si el nombre no es pasado debe retornar false', async () => {
    const resp = await useCase.execute({ name: '', questions: [] })
    expect(resp).toBeFalsy()
  })
  it('si todos los datos son pasados deben de aguardarse en form repository y retornar true', async () => {
    const myForm = { name: 'Form', questions: [], _id: '123' }
    const resp = await useCase.execute(myForm)
    expect(resp).toBeTruthy()
    expect(formRepository.forms.length).toBeGreaterThan(0)
  })
})
