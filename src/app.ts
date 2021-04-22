import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('hello world')
})

app.get('/register', (req, res) => {
  res.status(200).send('33131')
})

export { app }
