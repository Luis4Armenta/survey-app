/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { PingResolver } from './resolvers/ping'
import { FormResolver } from './resolvers/form'
import { buildSchema } from 'type-graphql'
import { router } from './routes'
import { verifyToken } from './middlewares/auth.middleware'
import { getToken } from './utils/helper'
import { JsonWebToken } from './providers/implementations/JsonWebToken'

const app = express()
const jwt = new JsonWebToken()
async function startServer (): Promise<void> {
  const serverGQL = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, FormResolver]
    }),
    context: ({ req }) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const token = getToken(req.headers.authorization ? req.headers.authorization : '')
      const context = {
        req,
        user: jwt.verify(token)
      }
      return context
    }
  })

  serverGQL.applyMiddleware({ app, path: '/graphql' })

  app.use(express.json())
  app.use(router)

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
