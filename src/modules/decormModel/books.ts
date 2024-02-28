import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'books'
})
export default class Books extends Model<Books> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  ISBN!: string
  @Column({
    type: DataTypes.STRING(50),
    field: 'bookname',
    allowNull: true
  })
  public bookname!: string
  @Column({
    type: DataTypes.STRING(20),
    field: 'author',
    allowNull: false
  })
  public author!: string
  @Column({
    type: DataTypes.INTEGER,
    field: 'publishid',
    allowNull: true
  })
  public publishid!: number
  @Column({
    type: DataTypes.INTEGER,
    field: 'publishername',
    allowNull: true
  })
  public publishername!: string
  @Column({
    type: DataTypes.INTEGER,
    field: 'monthsalecount',
    allowNull: true
  })
  public monthsalecount!: number
  @Column({
    type: DataTypes.STRING(255),
    field: 'bookpicname',
    allowNull: true
  })
  public bookpicname!: string
  @Column({
    type: DataTypes.INTEGER,
    field: 'secondctgyid',
    allowNull: true
  })
  public secondctgyid!: number
  @Column({
    type: DataTypes.INTEGER,
    field: 'thirdctgyid',
    allowNull: true
  })
  public thirdctgyid!: number
  @Column({
    type: DataTypes.INTEGER,
    field: 'originalprice',
    allowNull: true
  })
  public originalprice!: number
  @Column({
    type: DataTypes.INTEGER,
    field: 'discount',
    allowNull: true
  })
  public discount!: number
}