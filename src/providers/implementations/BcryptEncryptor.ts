import bcrypt from 'bcryptjs'
import { IEncryptor } from '../IEncryptor'

export class BcryptEncryptor implements IEncryptor {
  encrypt (password: string): string {
    return bcrypt.hashSync(password)
  }

  compare (comparing: string, comparator: string): boolean {
    return bcrypt.compareSync(comparing, comparator)
  }
}
