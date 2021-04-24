export interface IWebToken {
  sign: (identifier: string) => string
  verify: (token: string) => any
}
