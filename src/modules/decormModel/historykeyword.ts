import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'historykeyword'
})
export default class Historykeyword extends Model<Historykeyword> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  @Column({
    type: DataTypes.STRING(30),
    field: 'historykeyword',
    allowNull: false
  })
  public historykeyword!: string
  @Column({
    type: DataTypes.INTEGER,
    field: 'clickcount',
    allowNull: false
  })
  public clickcount!: string
}