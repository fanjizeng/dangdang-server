import { DataTypes } from 'sequelize'
import { sequelize } from '../dao/BaseDaoDefine'

class UserInfo {
  static createModel() {
    const model =  sequelize.define('userinfo', {
      userid: {
        type: DataTypes.INTEGER,
        field: 'userid',
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(20),
        field: 'username',
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(20),
        field: 'password',
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(50),
        field: 'address',
        allowNull: true
      },
      valid: {
        type: DataTypes.TINYINT,
        field: 'valid',
        allowNull: true
      }
    },
    {
      freezeTableName: true, // true表示使用给定的表名，false表示模型名后加s作为表名
      timestamps: false // true表示给模型加上时间戳属性
    })
    model.sync({force: false}) // false:当前表不存在，新建表，再传值，true: 存在表，先删除，再创建
    return model
  }
}

export const model = UserInfo.createModel()