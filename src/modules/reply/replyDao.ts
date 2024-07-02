import { sequelize } from '../BaseDao'
import type { ReplyRaw } from './utils'
class ReplyDao {
  static replyDao: ReplyDao = new ReplyDao()

  async addReply(reply: ReplyRaw) {
    const sql = `INSERT INTO reply(replycontent, replydate, evalid, replyor)
      VALUES('${reply.replycontent}', '${reply.strReplyDate}', '${reply.evalid}', '${reply.replyor}')`
    const res: any[] = (await sequelize.query(sql))[0]
    return res
  }
}

export default ReplyDao.replyDao