export interface IEncryptor {
  encrypt: (password: string, salt?: any) => string
  compare: (comparing: string, comparator: string) => boolean
}
