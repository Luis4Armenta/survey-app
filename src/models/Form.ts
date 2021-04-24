import { Model, Schema, model, Document } from 'mongoose'
import { IQuestion, QuestionModel } from './Question'

export interface IForm {
  _id?: string
  name: string
  questions: IQuestion[]
}

export interface FormModel extends Document, IForm {
  _id: string
  name: string
  questions: QuestionModel[]
}

export const formSchema = new Schema({
  name: String,
  questions: []
})

export const Form: Model<FormModel> = model('Form', formSchema)
