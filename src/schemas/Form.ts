import { Field, ObjectType } from 'type-graphql'
import { IQuestion } from './Question'

@ObjectType()
export class Form {
  // @Field({ nullable: true })
  // _id!: string

  @Field()
  name!: string

  @Field(type => [IQuestion])
  questions!: IQuestion[]
}
