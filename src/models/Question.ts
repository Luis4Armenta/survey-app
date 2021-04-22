import { Model, model, Schema, Document } from 'mongoose'
import { CloseAnswer, closeAnswerSchema, OpenAnswer } from './Answer'

export interface Question {
  question: string
}

export interface QuestionModel extends Document, Question {
  question: string
}

export const questionSchema = new Schema({
  question: String
}, { discriminatorKey: 'questionType' })

export const Question: Model<QuestionModel> = model('Question', questionSchema)

export interface CloseQuestion extends Question {
  options: string[]
  answers: CloseAnswer[]
}
export interface CloseQuestionModel extends Document, Question {
  options: string[]
  answers: CloseAnswer[]
}

export const closeQuestionSchema = new Schema({
  options: [String],
  answers: [closeAnswerSchema]
}, { discriminatorKey: 'questionType', _id: false })

export const CQuestion: Model<CloseQuestionModel> = model('CloseQuestion', closeQuestionSchema)

export interface OpenQuestion extends Question {
  answers: OpenAnswer[]
}

export interface OpenQuestionModel extends Document, Question {
  answers: OpenAnswer[]
}

export const openQuestionSchema = new Schema({
  answers: [closeAnswerSchema]
}, { discriminatorKey: 'questionType', _id: false })

export const OpenQuestion: Model<OpenQuestionModel> = model('OpenQuestion', openQuestionSchema)
