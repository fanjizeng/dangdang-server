import { Column, Model, Table } from 'sequelize-typescript'
import Reply from './reply'
@Table({
  tableName: 'evaluate',
})
//@Column 装饰器，用于将类的属性映射到数据库表的列。
export default class Evaluate extends Model<Evaluate> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  public evaluateid!: number
  @Column
  content!: string
  @Column
  evaluator!: string
  @Column
  isbn!: string
  @Column
  headportrai!: string
  @Column
  givealikenum!: string
  @Column
  evaluatedegree!: string
  @Column
  pubdate!: Date
  @Column
  isanonymous!: number

  replyid!: number
  replycontent!: string
  replydate!: Date
  replyor!: string
  evalid!: number
  replyLst: Pick<Reply, 'replyid' | 'replycontent' | 'replydate' | 'replyor' | 'evalid'>[]
    = []
}