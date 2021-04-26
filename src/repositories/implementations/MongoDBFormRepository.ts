import { Form, IForm } from '../../models/Form'
import { IQuestion } from '../../models/Question'
import { IFormRepository } from '../IFormRepository'

export class MongoDBFormRepository implements IFormRepository {
  async newForm (data: IForm): Promise<string> {
    if (this.hasAllTheParametersFilled(data.name)) {
      return await Form.create({ name: data.name, questions: data.questions })
        .then(form => form._id.toString())
        .catch(() => '')
    } else {
      return ''
    }
  }

  async getForm (formId: string): Promise<IForm | null> {
    if (this.hasAllTheParametersFilled(formId)) {
      return await Form.findById(formId)
        .then(form => form !== null ? form : null)
        .catch(() => null)
    } else {
      return null
    }
  }

  async addQuestion (formId: string, question: IQuestion): Promise<boolean> {
    if (this.hasAllTheParametersFilled(formId)) {
      return await Form.findByIdAndUpdate(formId, { $push: { questions: question } })
        .then(form => form !== null)
        .catch(() => false)
    } else {
      return false
    }
  }

  async deleteForm (formId: string): Promise<boolean> {
    if (this.hasAllTheParametersFilled(formId)) {
      return await Form.findByIdAndDelete(formId)
        .then(form => form !== null)
        .catch(() => false)
    } else {
      return false
    }
  }

  async removeQuestion (formId: string, questionNumber: number): Promise<boolean> {
    if (this.hasAllTheParametersFilled(formId, questionNumber)) {
      return await Form.findByIdAndUpdate(formId, { $pull: { questions: { num: questionNumber } } })
        .then(form => form !== null)
        .catch(() => false)
    } else {
      return false
    }
  }

  private hasAllTheParametersFilled (...objects: any[]): boolean {
    let response = true
    objects.forEach(item => {
      if (item === null || item === undefined || item === '' || item === 0) {
        response = false
      }
    })
    return response
  }
}
