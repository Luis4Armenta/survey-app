import { already } from '..'

describe('index', () => {
  test('should return true if the config its successfuly', () => {
    expect(already()).toBeTruthy()
  })
})
