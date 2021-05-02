import { Context } from 'node:vm'
import { Resolver, Mutation, Arg, Query, Int, Ctx } from 'type-graphql'
import { MongoDBFormRepository } from '../repositories/implementations/MongoDBFormRepository'
import { Form } from '../schemas/Form'
import { addCloseQuestion, AddOpenQuestion } from '../schemas/Question'
import { addQuestionUseCase } from '../useCases/addQuestion'
import { deleteFormUseCase } from '../useCases/deleteForm'
import { getFormUseCase } from '../useCases/getForm'
import { newFormUseCase } from '../useCases/newForm'
import { removeQuestionUseCase } from '../useCases/removeQuestion'

@Resolver()
export class FormResolver {
  @Mutation(() => String)
  async createForm (
    @Arg('name') name: string,
      @Arg('CloseQuestions', () => [addCloseQuestion], { description: 'Llene este parametro con preguntas cerradas', nullable: true }) closeQuestions: [addCloseQuestion],
      @Arg('OpenQuestions', () => [AddOpenQuestion], { description: 'Llene este parametro con preguntas abiertas', nullable: true }) openQuestions: [AddOpenQuestion]
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let questions: any[] = []
    closeQuestions.forEach(question => {
      questions.push(question)
    })
    openQuestions.forEach(question => {
      questions.push(question)
    })

    questions = questions.sort(function (a, b) { return a.num - b.num })
    return await newFormUseCase.execute({ name: name, questions: questions })
  }

  @Query(() => Form, { nullable: true })
  async form (@Arg('id') id: string): Promise<Form | null> {
    return await getFormUseCase.execute(id)
  }

  @Mutation(() => Boolean)
  async addQuestion (
    @Arg('formId') formId: string,
      @Arg('openQuetion', () => AddOpenQuestion, { nullable: true, description: 'Utiliza este campo para agregar una pregunta abierta' }) openQuetion: AddOpenQuestion,
      @Arg('closeQuetion', () => AddOpenQuestion, { nullable: true, description: 'Utiliza este campo para agregar una pregunta cerrada' }) closeQuetion: AddOpenQuestion
  ): Promise<boolean> {
    if (openQuetion !== null) {
      return await addQuestionUseCase.execute(formId, openQuetion)
    } else if (closeQuetion !== null) {
      return await addQuestionUseCase.execute(formId, closeQuetion)
    } else {
      return false
    }
  }

  @Mutation(() => Boolean)
  async deleteForm (@Arg('formId', () => String) formId: string, @Ctx() ctx: Context): Promise<boolean> {
    const userId = ctx.user.id
    return await deleteFormUseCase.execute(userId, formId)
  }

  @Mutation(() => Boolean)
  async removeQuestion (
    @Arg('formId', () => String) formId: string,
      @Arg('questionNumber', () => Int) questionNumber: number
  ): Promise<boolean> {
    return await removeQuestionUseCase.execute(formId, questionNumber)
  }

  @Mutation(() => String)
  async addForm (): Promise<string> {
    return await new MongoDBFormRepository().newForm({ name: 'Form', questions: [] })
  }
}
