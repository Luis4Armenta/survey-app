import { Router } from 'express'
import { createUserController } from './useCases/createUser'
import { loginControlller } from './useCases/login'

const router = Router()

router.post('/register', (request, response): any => {
  return createUserController.hanlde(request, response)
})

router.post('/login', (request, response): any => {
  return loginControlller.hanlde(request, response)
})

export { router }
