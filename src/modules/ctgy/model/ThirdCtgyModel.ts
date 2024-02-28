import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'

class ThirdCtgy {
  static createModel() {
    const model =  sequelize.define('thirdctgy', {
      thirdctgyid: {
        type: DataTypes.INTEGER,
        field: 'thirdctgyid',
        primaryKey: true,
        autoIncrement: true
      },
      thirdctgyname: {
        type: DataTypes.STRING(20),
        field: 'thirdctgyname',
        allowNull: false
      },
      secctgyid: {
        type: DataTypes.INTEGER,
        field: 'secctgyid',
        autoIncrement: false
      },
    },
    {
      freezeTableName: true, // true表示使用给定的表名，false表示模型名后加s作为表名
      timestamps: false // true表示给模型加上时间戳属性
    })
    model.sync({force: false}) // false:当前表不存在，新建表，再传值，true: 存在表，先删除，再创建
    return model
  }
}

export const thirdCtgyModel = ThirdCtgy.createModel()