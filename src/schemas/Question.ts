import { Field, InputType, Int, InterfaceType, ObjectType } from 'type-graphql'
import { CloseAnswer, OpenAnswer, AddCloseAnswer, AddOpenAnswer } from './Answer'

@InterfaceType({
  resolveType: value => {
    if ('options' in value) {
      return 'CloseQuestion'
    } else {
      return 'OpenQuestion'
    }
  }
})
export abstract class IQuestion {
  @Field(type => Int)
  num!: number

  @Field()
  question!: string
}

@ObjectType({ implements: IQuestion })
export class CloseQuestion implements IQuestion {
  @Field(type => Int)
  num!: number

  @Field()
  question!: string

  @Field(type => [String])
  options!: string[]

  @Field(type => [CloseAnswer])
  answers!: CloseAnswer
}

@ObjectType({ implements: IQuestion })
export class OpenQuestion implements IQuestion {
  @Field(type => Int)
  num!: number

  @Field()
  question!: string

  @Field(type => [OpenAnswer])
  answers!: OpenAnswer[]
}

@InputType({ description: 'first questions' })
export class AddQuestionInput implements Partial<IQuestion> {
  @Field(type => Int)
  num!: number

  @Field()
  question!: string
}

@InputType({ description: 'type for new close question' })
export class addCloseQuestion implements Partial<CloseQuestion> {
  @Field(type => Int)
  num!: number

  @Field()
  question!: string

  @Field(type => [String])
  options!: string[]

  @Field(type => [AddCloseAnswer], { defaultValue: [] })
  answers?: AddCloseAnswer
}

@InputType({ description: 'type for new open questions' })
export class AddOpenQuestion implements Partial<OpenQuestion> {
  @Field(type => Int)
  num!: number

  @Field()
  question!: string

  @Field(type => [AddOpenAnswer], { defaultValue: [] })
  answers?: AddOpenAnswer[]
}
