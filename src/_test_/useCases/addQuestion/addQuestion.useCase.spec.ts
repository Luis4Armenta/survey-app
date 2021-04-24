import { FormRepository } from '../utils/form.mocks'
import { AddQuestionUseCase } from '../../../useCases/addQuestion/addQuestion.useCase'

describe('add question - use case', () => {
  const formRepository = new FormRepository()
  const useCase = new AddQuestionUseCase(formRepository)

  beforeAll(async () => {
    formRepository.forms.push({ name: 'Form', questions: [], _id: '1' })
  })
  // afterEach(async () => {
  //   formRepository.forms = []
  // })

  it('si formId está vacío debe retornar false', async () => {
    const resp = await useCase.execute('', { question: '123', num: 1 })
    expect(resp).toBeFalsy()
  })
  it('si el nombre del formulario está vacío retorna false', async () => {
    const resp = await useCase.execute('123', { question: '', num: 1 })
    expect(resp).toBeFalsy()
  })
  it('debe almacenar la pregunta dentro de la base de datos', async () => {
    const resp = await useCase.execute('1', { question: 'question', num: 1 })
    const from = await formRepository.getForm('1')
    expect(resp).toBeTruthy()
    expect(from?._id).toStrictEqual('1')
    expect(from?.questions.length).toBeGreaterThan(0)
  })
})
