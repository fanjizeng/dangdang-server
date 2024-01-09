import mysql, { Connection } from 'mysql'
import dbConf from '../config/DbConfig'
class BaseDao {
  // 所有Dao的通用Dao
  static baseDao: BaseDao = new BaseDao()
  con!: Connection
  constructor() {
    this.connect()
  }
  async connect() {
    this.con = await mysql.createConnection(dbConf.getConf())
  }
  async query<T>(sql: string) {
    return new Promise<T>((resolve, reject) => {
      this.con.query(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

export default BaseDao.baseDao