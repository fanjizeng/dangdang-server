import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'keyword'
})
export default class Keyword extends Model<Keyword> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  @Column({
    type: DataTypes.STRING(30),
    field: 'keyword',
    allowNull: true
  })
  public keyword!: string
}