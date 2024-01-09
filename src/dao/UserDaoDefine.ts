import { Op } from 'sequelize'
import { model } from '../model/definemodel'
import { Sequelize } from 'sequelize-typescript'

class UserDaoDefine {
  static addUser(userinfo: UserInfo) {
    return model.create(userinfo)
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

export const { addUser, findAllUser, findByUsmAndPsw, findByLike, countUserinfo, findPage } = UserDaoDefine
type UserInfo = {
  userid: string
  username: string
  password: string
  address?: string
  valid: number
}