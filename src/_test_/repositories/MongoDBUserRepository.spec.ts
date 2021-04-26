import mongoose from 'mongoose'
import { Form, FormModel, IForm } from '../../models/Form'
import { User, IUser, UserModel } from '../../models/User.ts'
import { MongoDBUserRepository } from '../../repositories/implementations/MongoDBUserRepository'

describe('MongoDB User Repository', () => {
  const userRepository = new MongoDBUserRepository()
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/forms-test-users', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('register', () => {
    afterEach(async () => {
      await User.deleteMany()
    })
    test('debe regresar false si se pasa alguno parametro vacio', async () => {
      const resp = await userRepository.register({ username: '', password: '' })
      expect(resp).toBeFalsy()
    })
    test('debe regresar true si los parametros han sido llenados', async () => {
      const resp = await userRepository.register({ username: 'example', password: 'dadada' })
      expect(resp).toBeTruthy()
    })
    it('cuando se ingrese el formulario correctamente debe añadir un nuevo usuario a la DB', async () => {
      const resp = await userRepository.register({ username: 'example', password: 'passowrd' })
      expect(resp).toBeTruthy()
      const users = await User.find({})
      expect(users.length).not.toBe(0)
    })

    it('los datos de la base de datos deben ser iguales a los introducidos', async () => {
      const username = 'example'
      const password = 'password'

      const resp = await userRepository.register({ username: username, password: password })
      expect(resp).toBeTruthy()
      const users: IUser[] = await User.find({})
      expect(users[0].username).toBe(username)
      expect(users[0].password).toBe(password)
    })
  })

  describe('login', () => {
    const mock: IUser = {
      username: 'example',
      password: 'password',
      forms: []
    }
    beforeEach(async () => {
      await new User(mock).save()
    })
    afterAll(async () => {
      await User.deleteMany({})
    })

    test('si el usuario está vacio debe retornar null', async () => {
      const resp = await userRepository.login('')
      expect(resp).toBeNull()
    })

    it('debe regresar toda la información del usuario', async () => {
      const resp = await userRepository.login('example')
      expect(resp?.username).toBe(mock.username)
      expect(resp?.password).toBe(mock.password)
    })

    it('Si el usuario no es encontrado debe retornar null', async () => {
      const resp = await userRepository.login('example1')
      expect(resp).toBeNull()
    })
  })

  describe('getForms', () => {
    let user: UserModel
    let form: IForm
    let form2: IForm
    beforeEach(async () => {
      user = await new User({
        username: 'example',
        password: 'password',
        forms: []
      })
      form = await Form.create({
        name: 'test',
        questions: []
      })
      form2 = await Form.create({
        name: 'test2',
        questions: []
      })
      await user.forms.push(form)
      await user.forms.push(form2)
      await user.save()
    })
    afterEach(async () => {
      await User.deleteMany({})
      await Form.deleteMany({})
    })
    it('debe retornar un arreglo vacio si no es pasado el usuario', async () => {
      const resp = await userRepository.getForms('')
      expect(resp.length).toBe(0)
    })

    it('si se proporciona el usuario debe de retornar un arrelgo', async () => {
      const resp = await userRepository.getForms('example')
      expect(resp.length).toBeGreaterThan(-1)
    })

    it('los formularios deben ser los mismos que los guardados', async () => {
      const resp = await userRepository.getForms(user._id)

      expect(resp[0]._id).toStrictEqual(user.forms[0]._id)
      expect(resp[1]._id).toStrictEqual(user.forms[1]._id)
    })
  })

  describe('deleteForm', () => {
    let user: UserModel
    let form: FormModel
    let form2: FormModel
    beforeEach(async () => {
      user = await new User({
        username: 'example',
        password: 'password',
        forms: []
      })
      form = await Form.create({
        name: 'test',
        questions: [{
          num: 1,
          question: 'why?'
        }, {
          num: 2,
          question: 'what?'
        }, {
          num: 3,
          question: 'where?'
        }]
      })
      form2 = await Form.create({
        name: 'test2',
        questions: []
      })
      await user.forms.push(form)
      await user.forms.push(form2)
      await user.save()
    })
    afterEach(async () => {
      await User.deleteMany({})
      await Form.deleteMany({})
    })

    it('debe retornar false si no se da alguno de los parametros', async () => {
      const resp = await userRepository.deleteForm('', '')
      expect(resp).toBeFalsy()
    })
    it('debe retornar true si todo está bien y los parametros fueron llenados', async () => {
      const resp = await userRepository.deleteForm(user._id, form._id)
      expect(resp).toBeTruthy()
    })
    it('debe eliminar el id del formulario', async () => {
      const myForm = await User.findById(user._id)
      const resp = await userRepository.deleteForm(user._id, form._id)
      const currentForm = await User.findById(user._id)
      const forms = currentForm?.forms[0]._id?.toString()
      expect(resp).toBeTruthy()
      expect(forms).not.toBe(form._id.toString())
    })
  })
})
