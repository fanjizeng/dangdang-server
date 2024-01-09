import Koa, { Context } from 'koa'
import { fail } from './ResResult'
const globalException = async (ctx: Context, next: Koa.Next) => {
  try {
    console.log('通用异常')
    await next()
  } catch (err: any) {
    const errResult = err as { message: string }
    ctx.body = fail(errResult.message)
  }
}
export default globalException