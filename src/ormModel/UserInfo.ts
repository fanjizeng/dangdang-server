import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'userinfo'
})
export default class UserInfoModel extends Model<UserInfoModel> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  userid!: number
  @Column({
    type: DataTypes.STRING(20),
    field: 'username',
    allowNull: false
  })
  public username!: string
  @Column({
    type: DataTypes.STRING(20),
    field: 'password',
    allowNull: false
  })
  public password!: string
  @Column({
    type: DataTypes.STRING(50),
    field: 'address',
    allowNull: true
  })
  public address!: string
  @Column({
    type: DataTypes.TINYINT,
    field: 'valid',
    allowNull: true
  })
  public valid!: string
}