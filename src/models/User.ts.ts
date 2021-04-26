import mongoose, { Schema, Document, Model, model } from 'mongoose'
import { IForm } from './Form'

export interface IUser {
  _id?: string
  username: string
  password: string
  forms: IForm[]
}

export interface UserModel extends Document, IUser {
  _id: string
  username: string
  password: string
  forms: IForm[]
}

const userSchema = new Schema({
  username: String,
  password: String,
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }]
})

export const User: Model<UserModel> = model('User', userSchema)
