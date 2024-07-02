import Koa, { Context } from 'koa'
import { fail } from './ResResult'
import { verifyToken } from '../controller/BaseController'
const globalException = async (ctx: Context, next: Koa.Next) => {
  try {
    if (ctx.url.indexOf('login') === -1) {
      const authorization = ctx.headers.authorization
      if (authorization) {
        const token = authorization.split(' ')[1]
        if (token) verifyToken(token)
      }else {
        ctx.body = fail('token 不存在，您可能没有登陆')
      }
    }
    await next()
  } catch (err: any) {
    const errResult = err as { message: string }
    switch(err.name) {
      case 'JsonWebTpkenError':
        ctx.body = fail('这不是一个合法的token')
        break
      case 'TokenExpiredError':
        ctx.body = fail('已过期的token')
        break
      default:
        ctx.body = fail(errResult.message)
    }
  }
}
export default globalException