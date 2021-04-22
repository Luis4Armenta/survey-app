import mongoose, { Schema, Document, Model, model } from 'mongoose'
import { IForm } from './Form'
// import { FormModel, IForm } from './Form'

export interface IUser {
  username: string
  password: string
  forms?: IForm[]
}

export interface UserModel extends Document, IUser {
  username: string
  password: string
  forms: IForm[]
  // forms: FormModel[]
}

const userSchema = new Schema({
  username: String,
  password: String,
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }]
})

export const User: Model<UserModel> = model('User', userSchema)
