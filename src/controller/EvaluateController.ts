import { Context } from 'koa'
import { get, post, del } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import evaluateDao from '../modules/evaluate/dao/evaluateDao'
import { success } from '../common/ResResult'

@Controller('/evaluatemodule')
class EvaluateController {
  @get('/findEvalReplyLst/:isbn')
  async findEvalReplyLst(ctx: Context) {
    const request = ctx.params // 拿到请求对象
    const { isbn } = request
    const evalReplyLst = await evaluateDao.findEvalReplyLst(isbn)
    ctx.body = success(evalReplyLst, '请求成功')
  }
}

