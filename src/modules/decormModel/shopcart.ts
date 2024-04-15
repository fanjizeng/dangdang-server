import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'shopcart'
})
export default class ShopCart extends Model<ShopCart> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  shopcartid!: number
  @Column
  bookisbn!: string
  @Column
  bookname!: string
  @Column
  bookpicname!: string
  @Column
  bookprice!: number
  @Column
  userid!: number
  @Column
  purcharsenum!: number
}