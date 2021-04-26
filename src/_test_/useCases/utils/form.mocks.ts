import { IForm } from '../../../models/Form'
import { IQuestion } from '../../../models/Question'
import { IFormRepository } from '../../../repositories/IFormRepository'

export class FormRepository implements IFormRepository {
  forms: IForm[] = []

  async newForm (data: IForm): Promise<string> {
    if (data.name !== '') {
      const id = `${data.name}${Math.round(Math.random() * 100)}`
      await this.forms.push({ name: 'form', questions: [], _id: id, owner: data.owner })
      return id
    } else {
      return ''
    }
  }

  async getForm (formId: string): Promise<IForm | null> {
    if (formId !== '') {
      let rform = null
      this.forms.forEach(form => {
        if (form._id === formId) {
          rform = form
          return form
        }
      })
      return rform
    } else {
      return null
    }
  }

  async addQuestion (formId: string, question: IQuestion): Promise<boolean> {
    if (formId !== '') {
      let res = false
      this.forms.forEach(form => {
        if (form._id === formId) {
          form.questions.push(question)
          res = true
          return true
        }
      })
      return res
    } else {
      return false
    }
  }

  async deleteForm (formId: string): Promise<boolean> {
    if (formId !== '') {
      let res = false
      this.forms.forEach(form => {
        if (form._id === formId) {
          const index = this.forms.indexOf(form)
          this.forms.splice(index, 1)
          res = true
        }
      })
      return res
    } else {
      return false
    }
  }

  async removeQuestion (formId: string, questionNumber: number): Promise<boolean> {
    if (formId !== '' && questionNumber !== 0) {
      let res = false
      this.forms.forEach(form => {
        if (form._id === formId) {
          form.questions.forEach(question => {
            if (question.num === questionNumber) {
              const index = form.questions.indexOf(question)
              form.questions.splice(index, 1)
              res = true
            }
          })
        }
      })
      return res
    } else {
      return false
    }
  }
}
