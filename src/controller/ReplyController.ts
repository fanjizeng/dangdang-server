import { Context } from 'koa'
import { get, post, del } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import replyService from '../modules/reply/replyService'
import { success } from '../common/ResResult'

@Controller('/replymodule')
class ReplyController {
  @post('/addReply')
  async findEvalReplyLst(ctx: Context) {
    const reply = ctx.request.body // 拿到请求对象
    const lastdbReply = await replyService.addReply(reply)
    ctx.body = success(lastdbReply, '请求成功')
  }
}

