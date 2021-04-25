import { Field, InputType, Int, ObjectType, registerEnumType } from 'type-graphql'

@ObjectType()
export class Person {
  @Field()
  name!: string

  @Field()
  age!: number

  @Field()
  gender!: Gender
}

@InputType({ description: 'New Person data' })
export class AddPersonInput implements Partial<Person> {
  @Field()
  name!: string

  @Field(type => Int)
  age!: number

  @Field(type => Gender)
  gender!: Gender
}

enum Gender {
  man = 'man',
  woman = 'woman'
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'Gender of de person'
})
