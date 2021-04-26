import { Model, Schema, model, Document } from 'mongoose'
import { IQuestion, QuestionModel } from './Question'

export interface IForm {
  _id?: string
  name: string
  questions: IQuestion[]
  owner?: string
}

export interface FormModel extends Document, IForm {
  _id: string
  name: string
  questions: QuestionModel[]
  owner?: string
}

export const formSchema = new Schema({
  name: String,
  questions: [],
  owner: { type: String, required: false }
})

export const Form: Model<FormModel> = model('Form', formSchema)
