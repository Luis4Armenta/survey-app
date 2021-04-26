import { Request, Response, NextFunction } from 'express'
import { JsonWebToken } from '../providers/implementations/JsonWebToken'
import { getToken } from '../utils/helper'

export function verifyToken (request: Request | any, response: Response, next: NextFunction): any {
  try {
    const header = request.headers.authorization
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!header) {
      return response.status(401).send('deauthenticate request')
    }

    const token = getToken(header)
    if (token === null) {
      return response.status(401).send('deauthenticate request')
    }

    const payload: any = new JsonWebToken().verify(token)
    request.userId = payload.id
    console.log('dada')
    return next()
  } catch (error) {
    return response.status(401).send('deauthenticate request')
  }
}
