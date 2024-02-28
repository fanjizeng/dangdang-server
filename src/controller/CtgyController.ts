import { Context } from 'koa'
import { get } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import CtgyDao from '../modules/ctgy/dao/CtgyDao'
import { success } from '../common/ResResult'
import 'reflect-metadata'

@Controller('/ctgymodule')
class CtgyController {
  @get('/findSecThrd/:firstctgyid')
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params
    const ctgyInfo = await CtgyDao.findSecThrdCtgys(firstctgyid)
    ctx.body = success(ctgyInfo, '请求成功')
  }
  @get('/getThirdBySecId/:secCtgyId')
  async getThirdBySecId(ctx: Context) {
    const { secCtgyId } = ctx.params
    const ctgyInfo = await CtgyDao.getThirdBySecId(secCtgyId)
    ctx.body = success(ctgyInfo, '请求成功')
  }
  @get('/findFirstCtgyList')
  async findFirstCtgyList(ctx: Context) {
    const { firstctgyid } = ctx.params
    const ctgyInfo = await CtgyDao.findFstCtgys()
    ctx.body = success(ctgyInfo, '请求成功')
  }
  @get('/findThirdCtgy/:thirdctgyid')
  async findThirdCtgy(ctx: Context) {
    const { thirdctgyid } = ctx.params
    const ctgyInfo = await CtgyDao.findThirdCtgy(thirdctgyid)
    ctx.body = success(ctgyInfo, '请求成功')
  }
}

