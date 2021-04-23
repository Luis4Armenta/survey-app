import { IForm } from '../models/Form'
import { IQuestion } from '../models/Question'

export interface IFormRepository {
  newForm: (form: IForm) => Promise<string>
  getForm: (formId: string) => Promise<IForm | null>
  addQuestion: (formId: string, question: IQuestion) => Promise<boolean>
  deleteForm: (formId: string) => Promise<boolean>
  removeQuestion: (formId: string, questionId: string) => Promise<boolean>
}
