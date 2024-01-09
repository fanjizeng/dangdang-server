// import { where, Op, ModelAttributes, DataTypes } from 'sequelize'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import conf, { DbConconf } from '../config/DbConfig'

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine()
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
      define: { timestamps: false, freezeTableName: true}
    })
  }
}

export const { sequelize } = BaseDaoDefine.baseDaoOrm