import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'firstctgy'
})
export default class Ctgys extends Model<Ctgys> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  firstCtgyId!: number
  @Column({
    type: DataTypes.STRING(20),
    field: 'firstctgyname',
    allowNull: true
  })
  public firstctgyname!: string
}