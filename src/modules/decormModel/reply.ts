import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize';
@Table({
  tableName: 'reply',
})
export default class Reply extends Model<Reply> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  public replyid!: number
  @Column
  replycontent!: string
  @Column({
    type: DataTypes.DATE,
    get() {
      const rawValue = this.getDataValue('replydate');
      return rawValue ? rawValue.toISOString().split('T')[0] : null; // 转换为字符串日期格式 'YYYY-MM-DD'
    },
    set(value: string) {
      this.setDataValue('replydate', new Date(value));
    }
  })
  replydate!: Date;
  strReplyDate!: string // 不存储在数据库中的字段，仅用于前端传值
  @Column
  evalid!: number
  @Column
  replyor!: string
}