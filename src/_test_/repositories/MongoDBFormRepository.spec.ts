import mongoose from 'mongoose'
import { Form, FormModel, IForm } from '../../models/Form'
import { ICloseQuestion, IQuestion, Question } from '../../models/Question'
import { MongoDBFormRepository } from '../../repositories/implementations/MongoDBFormRepository'

const formRepository = new MongoDBFormRepository()
describe('MongoDB Form Repository', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/forms-test-forms', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await Form.deleteMany()
  })

  describe('newFrom', () => {
    test('debe retornar un string', async () => {
      const resp = await formRepository.newForm({ name: '3131312', questions: [] })
      expect(typeof resp).toBe('string')
    })
    test('si recibe el nombre del formulario vacio debe retornar un string vacío', async () => {
      const resp = await formRepository.newForm({ name: '', questions: [] })
      expect(resp).toBe('')
    })
    test('si recibe el nombre del formulario no debe retornar un string vacío', async () => {
      const resp = await formRepository.newForm({ name: 'name', questions: [] })
      expect(resp).not.toBe('')
    })
    test('debe guardar el formulario en la base de datos', async () => {
      // const form = Form.create({ name: 'form1', questions: [] })
      const form1: IForm = {
        name: 'Form', questions: []
      }
      await formRepository.newForm(form1)
      const form = await Form.findOne({ name: form1.name })
      expect(form).not.toBeNull()
    })

    test('debe retornar el _id del nuevo formulario', async () => {
      // const form = Form.create({ name: 'form1', questions: [] })
      const form1: IForm = {
        name: 'Form',
        questions: [new Question({
          question: 'pregunta'
        }), new Question({
          question: 'pregunta 2'
        })]
      }
      const id = await formRepository.newForm(form1)
      const form = await Form.findById(id)
      expect(form).not.toBeNull()
      expect(id).toStrictEqual(form?._id.toString())
    })
  })

  describe('getForm', () => {
    let form1: IForm
    beforeEach(async () => {
      form1 = {
        name: 'Form',
        questions: [new Question({
          question: 'pregunta'
        }), new Question({
          question: 'pregunta 2'
        })]
      }
    })
    afterEach(async () => {
      await Form.deleteMany()
    })

    it('si el id de formulario está vacío debe retornar un null', async () => {
      const resp = await formRepository.getForm('')
      expect(resp).toBeNull()
    })
    it('si se proporciona el id debe retornar el objeto relacionado', async () => {
      const form = await Form.create(form1)
      const resp = await formRepository.getForm(form._id)
      expect(resp).not.toBeNull()
      expect(resp?._id?.toString()).toStrictEqual(form._id.toString())
    })
    it('si el id proporcionado no existe en la base de datos debe retornar null', async () => {
      await Form.create(form1)
      const resp = await formRepository.getForm('43534343sdf23wdadf3423')
      expect(resp).toBeNull()
    })
  })

  describe('addQuestion', () => {
    let form: FormModel
    beforeEach(async () => {
      form = await Form.create({
        name: 'Form'
      })
    })
    afterAll(async () => {
      await Form.deleteMany()
    })

    it('debe retornar false si la data no es proporcionada', async () => {
      const newQuestion: IQuestion = {
        question: 'pregunta',
        num: 1
      }
      const resp = await formRepository.addQuestion('', newQuestion)

      expect(resp).toBe(false)
    })
    it('debe retornar true si existe un formulario con el id dado', async () => {
      const newQuestion: IQuestion = {
        num: 1,
        question: 'pregunta'
      }
      const resp = await formRepository.addQuestion(form._id.toString(), newQuestion)
      expect(resp).toBeTruthy()
    })
    it('debe retornar false si no existe un formulario con el id dado', async () => {
      const newQuestion: IQuestion = {
        num: 1,
        question: 'pregunta'
      }
      const resp = await formRepository.addQuestion('sdasdasedasdsa33dfws', newQuestion)
      expect(resp).toBeFalsy()
    })
    it('debe introducir la question al formulario', async () => {
      // const newQuestion: IQuestion = {
      //   question: 'pregunta'
      // }
      const newCQuestion: ICloseQuestion = {
        num: 1,
        question: 'Pregunta cerrada',
        options: ['a', 'b', 'c'],
        answers: []
      }
      const resp = await formRepository.addQuestion(form._id.toString(), newCQuestion)
      expect(resp).toBeTruthy()
      const formUpdated = await Form.findById(form._id)
      expect(formUpdated?.questions.length).toBeGreaterThan(0)
    })
  })

  describe('deleteForm', () => {
    let form: FormModel
    beforeEach(async () => {
      form = await Form.create({
        name: 'Form'
      })
    })
    afterEach(async () => {
      await Form.deleteMany()
    })
    it('si recibe un id vacío debe retornar false', async () => {
      const res = await formRepository.deleteForm('')
      expect(res).toBeFalsy()
    })
    it('si el formulario no existe retorna false', async () => {
      const res = await formRepository.deleteForm('44242sf32ewf44q')
      expect(res).toBeFalsy()
    })
    it('si se encuentra el id del formulario debre retornar true', async () => {
      const res = await formRepository.deleteForm(form._id)
      expect(res).toBeTruthy()
    })
    it('si el formulario es eliminado retorna true', async () => {
      const res = await formRepository.deleteForm(form._id)
      const myForm = await Form.findById(form._id)
      expect(res).toBeTruthy()
      expect(myForm).toBeNull()
    })
  })

  describe('removeQuestion', () => {
    let form: FormModel
    beforeEach(async () => {
      form = await Form.create({
        name: 'Form',
        questions: [{
          _id: '1',
          num: 1,
          question: 'Question'
        }, {
          _id: '2',
          num: 2,
          question: 'Question 2'
        }]
      })
    })
    afterEach(async () => {
      await Form.deleteMany()
    })
    it('debe retornar un boolean', async () => {
      const resp = await formRepository.removeQuestion('', '')
      expect(typeof resp).toBe('boolean')
    })
    it('si no tiene id o formulario debe retornar false', async () => {
      const resp = await formRepository.removeQuestion('', '')
      expect(resp).toBeFalsy()
    })
    it('si el formulario no existe debe retornar false', async () => {
      const resp = await formRepository.removeQuestion('3131d', '414d')
      expect(resp).toBeFalsy()
    })
    it('si el formulario existe debe retornar true', async () => {
      const resp = await formRepository.removeQuestion(form._id, '414d')
      expect(resp).toBeTruthy()
    })
    it('debe eliminar la pregunta especificada', async () => {
      const resp = await formRepository.removeQuestion(form._id, '1')
      const currentForm = await Form.findById(form._id)
      const questions = await Form.findById(form._id)
      expect(questions?.questions[0].num).not.toBe(1)
      expect(currentForm?.questions.length).toBe(1)
      expect(resp).toBeTruthy()
    })
  })
})
