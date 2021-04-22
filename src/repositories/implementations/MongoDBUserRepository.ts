import { IForm } from '../../models/Form'
import { IUser, User } from '../../models/User.ts'
import { IUserRepository } from '../IUserRepository'

export class MongoDBUserRepository implements IUserRepository {
  async register (username: string, password: string): Promise<boolean> {
    if (username === '' && username === '') {
      return false
    } else {
      const newUser = new User({
        username: username,
        password: password
      })
      await newUser.save()
      return true
    }
  }

  async login (username: string): Promise<IUser> {
    if (username !== '') {
      const user = await User.findOne({ username: username })
        .then(user => {
          if (user != null) {
            return user
          } else {
            return {
              username: '',
              password: ''
            }
          }
        })
      return user
    } else {
      return {
        username: '',
        password: ''
      }
    }
  }

  async getForms (username: string): Promise<IForm[]> {
    if (username !== '') {
      const user: IForm[] = await User.findOne({ username: username }).populate('forms')
        .then(user => {
          if (user !== null) {
            return user.forms
          } else {
            return []
          }
        })
      return user
    } else {
      return []
    }
  }
}
