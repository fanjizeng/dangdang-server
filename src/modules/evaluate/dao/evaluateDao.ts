import { sequelize } from '../../BaseDao'
import convert from '../convert'

class EvaluateDao {
  static evaluateDao: EvaluateDao = new EvaluateDao()

  async findEvalReplyLst(isbn: string) {
    const sql = `SELECT * FROM evaluate e LEFT OUTER JOIN DANG_DATA.reply r ON e.evaluateid=r.evalid WHERE e.isbn='${isbn}'`
    const res: any[] = (await sequelize.query(sql))[0]
    return convert(res)
  }
}

export default EvaluateDao.evaluateDao