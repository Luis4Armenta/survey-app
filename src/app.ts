/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { PingResolver } from './resolvers/ping'
import { FormResolver } from './resolvers/form'
import { buildSchema } from 'type-graphql'
import { router } from './routes'
import { verifyToken } from './middlewares/auth.middleware'
import { JsonWebToken } from './providers/implementations/JsonWebToken'
import morgan from 'morgan'
import cors from 'cors'
import { getToken } from './utils/helper'

const app = express()
const jwt = new JsonWebToken()
async function startServer (): Promise<void> {
  const serverGQL = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, FormResolver]
    }),
    context: ({ req }) => {
      const token = getToken(req.headers.authorization !== undefined ? req.headers.authorization : '')
      const context = {
        req,
        user: jwt.verify(token)
      }
      return context
    }
  })

  app.use(express.json())
  app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }))
  app.use(morgan('dev'))
  app.use(router)
  serverGQL.applyMiddleware({ app, path: '/graphql' })

  app.all('*', verifyToken)

  app.get('/', (req, res) => {
    res.status(200).send('hello world')
  })

  app.get('/register', (req, res) => {
    res.status(200).send('33131')
  })
}
startServer()

export { app }
