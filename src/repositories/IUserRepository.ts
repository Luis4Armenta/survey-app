import { IUser } from '../models/User.ts'
import { IForm } from '../models/Form'
import { CreateUserDTO } from '../useCases/createUser/createUserDTO'

export interface IUserRepository {
  register: (data: CreateUserDTO) => Promise<boolean>
  login: (username: string) => Promise<IUser | null>
  getForms: (userId: string) => Promise<IForm[]>
  deleteForm: (userId: string, formId: string) => Promise<boolean>
}
