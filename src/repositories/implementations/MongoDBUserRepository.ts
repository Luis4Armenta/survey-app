import { IForm } from '../../models/Form'
import { IUser, User } from '../../models/User.ts'
import { CreateUserDTO } from '../../useCases/createUser/createUserDTO'
import { IUserRepository } from '../IUserRepository'

export class MongoDBUserRepository implements IUserRepository {
  async register (data: CreateUserDTO): Promise<boolean> {
    if (this.hasAllTheParametersFilled(data.username, data.password)) {
      return await User.create({
        username: data.username,
        password: data.password
      })
        .then(() => true)
        .catch(() => false)
    } else {
      return false
    }
  }

  async login (username: string): Promise<IUser | null> {
    if (this.hasAllTheParametersFilled(username)) {
      return await User.findOne({ username: username })
        .then(user => user !== null ? user : null)
        .catch(() => null)
    } else {
      return null
    }
  }

  async getForms (userId: string): Promise<IForm[]> {
    if (this.hasAllTheParametersFilled(userId)) {
      return await User.findOne({ _id: userId }).populate('forms')
        .then(user => user !== null ? user.forms : [])
        .catch(() => [])
    } else {
      return []
    }
  }

  private hasAllTheParametersFilled (...objects: any[]): boolean {
    let response = true
    objects.forEach(item => {
      if (item === null || item === undefined || item === '' || item === 0) {
        response = false
      }
    })
    return response
  }
}
