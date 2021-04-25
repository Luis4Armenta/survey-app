/* eslint-disable @typescript-eslint/no-floating-promises */
import 'reflect-metadata'
import { app } from './app'
import mongoose from 'mongoose'

async function iniciarDB (): Promise<void> {
  await mongoose.connect('mongodb://localhost/forms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

iniciarDB()

app.listen(3000, () => {
  console.log('Server on port ', 3000)
})
