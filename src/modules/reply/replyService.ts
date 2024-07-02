import { combine } from '../../tstypes'
import replyDao from './replyDao'
import type { ReplyRaw } from './utils'

class ReplyServiece {
  static replyService: ReplyServiece = new ReplyServiece()
  addReply(reply: ReplyRaw) {
    const dbReply = replyDao.addReply(reply)
    const lastNewReply = combine({ replyid: dbReply }, reply)
    return lastNewReply
  }
}
export default ReplyServiece.replyService