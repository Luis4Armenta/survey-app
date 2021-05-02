/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IForm } from '../../../models/Form'
import { IUser } from '../../../models/User.ts'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { CreateUserDTO } from '../../../useCases/createUser/createUserDTO'

export class UserRepository implements IUserRepository {
  users: IUser[] = []

  async register (data: CreateUserDTO): Promise<boolean> {
    if (data.password === '' && data.username === '') {
      return false
    } else {
      this.users.push({
        _id: Math.round(Math.random() * 10000).toString(),
        username: data.username,
        password: data.password,
        forms: []
      })
      return true
    }
  }

  async login (username: string): Promise<IUser | null> {
    if (username !== '') {
      let ruser = null
      this.users.forEach(user => {
        if (user.username === username) {
          ruser = user
        }
      })
      return ruser
    } else {
      return null
    }
  }

  async getForms (username: string): Promise<IForm[]> {
    if (username !== '') {
      this.users.forEach(user => {
        if (user.username === username) {
          return user.forms
        } else {
          return []
        }
      })
      return []
    } else {
      return []
    }
  }

  async deleteForm (userId: string, formId: string): Promise<boolean> {
    if (userId !== '' || formId !== '') {
      let response = false
      this.users.forEach(user => {
        if (user._id === userId) {
          user.forms.forEach(form => {
            if (form._id === formId) {
              const index = user.forms.indexOf(form)
              user.forms.splice(index, 1)
              response = true
            }
          })
        }
      })
      return response
    } else {
      return false
    }
  }
}
