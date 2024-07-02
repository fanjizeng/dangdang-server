import { Op, Sequelize } from 'sequelize'
import { model } from '../model'

class UserDao {
  static UserDao: UserDao = new UserDao()
  static addUser(userinfo: UserInfo) {
    return model.create(userinfo)
  }
  static findOneUser(username: string, password: string) {
    return model.findOne({
      raw: true,
      where: { username, password }
    })
  }
  static findAllUser() {
    return model.findAll({
      raw: true
    })
  }
  static findByUsmAndPsw(username: string, password: string) {
    return model.findOne({
      raw: true,
      where: {
        [Op.or]: [
          {
            username
          },
          {
            password
          }
        ]
      }
    })
  }
  static findByLike(key: string) {
    const searchKey=`%${key}%`
    return model.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey
        }
      }
    })
  }
  static countUserinfo(valid: number) {
    return model.findAll({
      raw: true,
      group: 'address',
      attributes: ['address', [Sequelize.fn('count',Sequelize.col('valid')), '总人数']],
      where: {
        valid
      }
    })
  }
  static findPage(offset: number, limit: number) {
    return model.findAll({
      raw: true,
      limit,
      offset
    })
  }
}

export const { addUser, findOneUser, findAllUser, findByUsmAndPsw, findByLike, countUserinfo, findPage } = UserDao
export type UserInfo = {
  userid: string
  username: string
  password: string
  address?: string
  valid: number
  token?: string
}