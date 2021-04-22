import { model, Model, Schema, Document } from 'mongoose'
import { IPerson, personSchema } from './Person'

export interface CloseAnswer {
  anonimo: boolean
  person?: IPerson
  answer: number[]
}

export interface CloseAnswerModel extends Document, CloseAnswer {
  anonimo: boolean
  person?: IPerson
  answer: number[]
}

export const closeAnswerSchema = new Schema({
  anonimo: Boolean,
  person: { type: personSchema, required: false },
  answer: [Number]
}, { _id: false })

export const CloseAnswer: Model<CloseAnswerModel> = model('CloseAnswer', closeAnswerSchema)

export interface OpenAnswer {
  anonimo: boolean
  person?: IPerson
  answer: string
}

export interface OAnswerModel extends Document, OpenAnswer {
  anonimo: boolean
  person?: IPerson
  answer: string
}

export const oanswerSchema = new Schema({
  anonimo: Boolean,
  person: { type: personSchema, required: false },
  answer: String
}, { _id: false })

export const OAnswer: Model<OAnswerModel> = model('OAnswer', oanswerSchema)
