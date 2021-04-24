import { Model, model, Schema, Document } from 'mongoose'
import { CloseAnswer, closeAnswerSchema, OpenAnswer } from './Answer'

export interface IQuestion {
  num: number
  question: string
}

export interface QuestionModel extends Document, IQuestion {
  num: number
  question: string
}

export const questionSchema = new Schema({
  num: Number,
  question: String
})

export const Question: Model<QuestionModel> = model('Question', questionSchema)

export interface ICloseQuestion extends IQuestion {
  options: string[]
  answers: CloseAnswer[]
}
export interface CloseQuestionModel extends Document, ICloseQuestion {
  options: string[]
  answers: CloseAnswer[]
}

export const closeQuestionSchema = new Schema({
  question: String,
  options: [String],
  answers: [closeAnswerSchema]
})

export const CloseQuestion: Model<CloseQuestionModel> = model('CloseQuestion', closeQuestionSchema)

export interface OpenQuestion extends IQuestion {
  answers: OpenAnswer[]
}

export interface OpenQuestionModel extends Document, IQuestion {
  answers: OpenAnswer[]
}

export const openQuestionSchema = new Schema({
  answers: [closeAnswerSchema]
}, { discriminatorKey: 'questionType', _id: false })

export const OpenQuestion: Model<OpenQuestionModel> = model('OpenQuestion', openQuestionSchema)
