import { Field, InputType, ObjectType } from 'type-graphql'
import { Person, AddPersonInput } from './Person'

@ObjectType()
export class CloseAnswer {
  @Field()
  anonimo!: boolean

  @Field({ nullable: true })
  person?: Person

  @Field(type => [Number])
  answer!: number[]
}

@ObjectType()
export class OpenAnswer {
  @Field()
  anonimo!: boolean

  @Field({ nullable: true })

  @Field()
  answer!: string
}

@InputType({ description: 'input para crear una respuesta cerrada' })
export class AddCloseAnswer {
  @Field()
  anonimo!: boolean

  @Field({ nullable: true })
  person?: AddPersonInput

  @Field(type => [Number])
  answer!: number[]
}

@InputType({ description: 'input para crear una respuesta abierta' })
export class AddOpenAnswer {
  @Field()
  anonimo!: boolean

  @Field({ nullable: true })
  person?: AddPersonInput

  @Field()
  answer!: string
}
