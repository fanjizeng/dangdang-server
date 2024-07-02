import { Context } from 'koa'
import { post } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import UserService from '../modules/userinfo/service/userinfoService'
import { success, fail } from '../common/ResResult'
import 'reflect-metadata'

@Controller('/usermodule')
class UserController {
  @post('/login')
  async login(ctx: Context) {
    const { username, password } = ctx.request.body
    const userInfo = await UserService.login(username, password)
    if (userInfo) ctx.body = success(userInfo, '请求成功')
    else ctx.body = fail('用户名或者密码不正确，请检查后再重新登录')
  }
}
