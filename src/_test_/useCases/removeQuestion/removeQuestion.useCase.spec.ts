import { RemoveQuestionUseCase } from '../../../useCases/removeQuestion/removeQuestion.useCase'
import { FormRepository } from '../utils/form.mocks'

describe('remove question - use case', () => {
  const formRepository = new FormRepository()
  const useCase = new RemoveQuestionUseCase(formRepository)

  beforeEach(() => {
    formRepository.forms = []
    formRepository.forms.push({ name: 'Form', questions: [{ num: 1, question: 'why?' }], _id: '1' })
  })

  it('debe retornar false si alguno de los campos no es proporcionado', async () => {
    const resp = await useCase.execute('', 0)
    expect(resp).toBeFalsy()
  })
  it('si el formulario no existe dentro del sistema debe retornar false', async () => {
    const formId = '1asdsadsad'
    const questionNum = 6
    const resp = await useCase.execute(formId, questionNum)
    expect(resp).toBeFalsy()
  })
  it('si la pregunta exite en el formulario debe retornar true', async () => {
    const formId = '1'
    const questionNum = 1
    const resp = await useCase.execute(formId, questionNum)
    expect(resp).toBeTruthy()
  })
  it('si retorna true la pregunta debe ser eliminada del formulario', async () => {
    const formId = '1'
    const questionNum = 1
    const resp = await useCase.execute(formId, questionNum)
    expect(resp).toBeTruthy()
    expect(formRepository.forms[0].questions.length).toBe(0)
  })
})
