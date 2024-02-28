import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'

class FirstCtgy {
  static createModel() {
    const model =  sequelize.define('firstctgy', {
      firstCtgyId: {
        type: DataTypes.INTEGER,
        field: 'firstCtgyId',
        primaryKey: true,
        autoIncrement: true
      },
      firstctgyname: {
        type: DataTypes.STRING(20),
        field: 'firstctgyname',
        allowNull: false
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

export const firstModel = FirstCtgy.createModel()