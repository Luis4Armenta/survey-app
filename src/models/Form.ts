import { Model, Schema, model, Document } from 'mongoose'
import { Question, QuestionModel } from './Question'

export interface IForm {
  _id?: string
  name: string
  questions: Question[]
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
