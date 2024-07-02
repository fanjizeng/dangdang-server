import Koa, { Context } from 'koa'
import { fail } from './ResResult'
const globalException = async (ctx: Context, next: Koa.Next) => {
  await next().catch(err => {
    if (err.status === 401) {
      ctx.body = fail('这是不合法或过期的token', err.status)
    } else {
      ctx.body = fail(`服务器错误：${err}`)
    }
  })
}
export default globalException