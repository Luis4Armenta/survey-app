import { IEncryptor } from '../../../providers/IEncryptor'

class EncryptorMock implements IEncryptor {
  encrypt (password: string, salt?: number): string {
    if (salt !== undefined) {
      let code: string = ''
      for (let i = 0; i < salt; i++) {
        code = code + 'coded/'
      }
      return code
    } else {
      return `${password}coded/`
    }
  }

  compare (comparing: string, comparator: string): boolean {
    if (comparator.includes(comparing)) {
      return true
    } else {
      return false
    }
  }
}

const encryptor = new EncryptorMock()

export { encryptor }
