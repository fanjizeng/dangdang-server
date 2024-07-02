import { findOneUser } from '../dao/UserDao'
import type { UserInfo } from '../dao/UserDao'
import jwt from 'jsonwebtoken'

class UserService {
  static userService: UserService = new UserService()
  async login(username: string, password: string) {
    const userinfo = await findOneUser(username, password) as unknown as UserInfo
    if (userinfo)
      return this.createJWTToken(userinfo)
    else return
  }
  async createJWTToken(userinfo: UserInfo) {
    const token: string = jwt.sign({ data: userinfo }, 'jashf09033239', { expiresIn: '30h', header: { alg: 'HS256', typ: 'JWT  ' } })
    userinfo.token = token
    return userinfo
  }
}
export default UserService.userService