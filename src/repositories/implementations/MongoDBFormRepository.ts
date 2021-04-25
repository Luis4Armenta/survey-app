import { Form, IForm } from '../../models/Form'
import { IQuestion } from '../../models/Question'
import { IFormRepository } from '../IFormRepository'

export class MongoDBFormRepository implements IFormRepository {
  async newForm (data: IForm): Promise<string> {
    if (data.name !== '') {
      const form = await Form.create({ name: data.name, questions: data.questions })
      return form._id.toString()
    } else {
      return ''
    }
  }

  async getForm (formId: string): Promise<IForm | null> {
    if (formId !== '') {
      return await Form.findById(formId)
        .then(form => {
          if (form !== null) {
            return form
          } else {
            return null
          }
        })
        .catch(() => {
          return null
        })
    } else {
      return null
    }
  }

  async addQuestion (formId: string, question: IQuestion): Promise<boolean> {
    if (formId !== '') {
      return await Form.findByIdAndUpdate(formId, { $push: { questions: question } })
        .then(form => {
          if (form !== null) {
            return true
          } else {
            return false
          }
        })
        .catch(() => false)
    } else {
      return false
    }
  }

  async deleteForm (formId: string): Promise<boolean> {
    if (formId !== '') {
      return await Form.findByIdAndDelete(formId)
        .then(form => {
          if (form !== null) {
            return true
          } else {
            return false
          }
        })
        .catch(() => false)
    } else {
      return false
    }
  }

  async removeQuestion (formId: string, questionId: string): Promise<boolean> {
    if (formId !== '' && questionId !== '') {
      return await Form.findByIdAndUpdate(formId, { $pull: { questions: { num: parseInt(questionId) } } })
        .then(form => {
          if (form !== null) {
            return true
          } else {
            return false
          }
        })
        .catch(() => false)
    } else {
      return false
    }
  }
}
