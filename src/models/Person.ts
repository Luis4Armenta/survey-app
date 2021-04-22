import { Document, model, Model, Schema } from 'mongoose'

export interface IPerson {
  name: string
  age: number
  gender: gender
}

export interface PersonModel extends Document, IPerson {
  name: string
  age: number
  gender: gender
}

export const personSchema = new Schema({
  name: String,
  age: Number,
  gender: { type: String, enum: ['man', 'woman'] }
}, { _id: false })

export const Person: Model<PersonModel> = model('Person', personSchema)

enum gender {
  man,
  woman
}
