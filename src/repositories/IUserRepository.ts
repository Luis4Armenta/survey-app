import { IUser } from '../models/User.ts'
import { IForm } from '../models/Form'

export interface IUserRepository {
  register: (username: string, password: string) => Promise<boolean>
  login: (username: string) => Promise<IUser>
  getForms: (username: string) => Promise<IForm[]>
}
