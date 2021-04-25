/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { PingResolver } from './resolvers/ping'
import { FormResolver } from './resolvers/form'
import { buildSchema } from 'type-graphql'

const app = express()
async function startServer (): Promise<void> {
  const serverGQL = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, FormResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  })

  serverGQL.applyMiddleware({ app, path: '/graphql' })

  app.get('/', (req, res) => {
    res.status(200).send('hello world')
  })

  app.get('/register', (req, res) => {
    res.status(200).send('33131')
  })
}
startServer()

export { app }
