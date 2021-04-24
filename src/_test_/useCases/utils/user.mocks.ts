/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IForm } from '../../../models/Form'
import { IUser } from '../../../models/User.ts'
import { IUserRepository } from '../../../repositories/IUserRepository'

export class UserRepository implements IUserRepository {
  users: IUser[] = []

  async register (username: string, password: string): Promise<boolean> {
    if (username === '' && username === '') {
      return false
    } else {
      this.users.push({
        username: username,
        password: password,
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
}
