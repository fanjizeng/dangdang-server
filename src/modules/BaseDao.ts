// import { where, Op, ModelAttributes, DataTypes } from 'sequelize'
import path from 'path'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import conf, { DbConconf } from '../config/DbConfig'

class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    // 创建sequelize对象，参数分别为：数据库名称，数据库类型，密码，配置
    let { host, user, password, database, port }: DbConconf = conf.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, // 方言表示何种数据库
      define: { timestamps: false, freezeTableName: true },
      pool: {
        // 数据库连接池
        max: 50,
        min: 10,
        idle: 10000, // 空闲等待时间，超过后，自动释放未利用的连接
        acquire: 10000 // 服务器连接超时时间
      }
    })
  }
  addModel() {
    const ModelPath = path.join(process.cwd(), '/src/modules/decormModel')
    this.sequelize.addModels([ModelPath])
  }
}
const baseDao = BaseDao.baseDao
baseDao.addModel()
export const { sequelize } = baseDao