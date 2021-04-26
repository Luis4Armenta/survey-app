import { Context } from 'node:vm'
import { Ctx, Query, Resolver } from 'type-graphql'

@Resolver()
export class PingResolver {
  @Query(() => String)
  ping (@Ctx() ctx: Context): string {
    console.log(ctx.req.headers.authorization)
    console.log(ctx.user)
    return 'pong'
  }
}
