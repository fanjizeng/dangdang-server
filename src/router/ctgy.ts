import { Context } from 'koa'
import Router from 'koa-router'
import { success } from '../common/ResResult'
import CtgyDao from '../modules/ctgy/dao/CtgyDao'
import '../tstypes/index'
const router = new Router()

router.prefix('/ctgymodule')

router.get("/findByCtgy/:key", async (ctx: Context) => {
  const { key } = ctx.params
  const ctgyInfo = await CtgyDao.findSecThrdCtgysByFstCtgys(key)
  ctx.body = success(ctgyInfo, '请求成功')
})
router.get("/findByUsmAndAddr/:key", async (ctx: Context) => {
  const { key } = ctx.params
  const ctgyInfo = await CtgyDao.findSecThrdCtgys(parseInt(key))
  ctx.body = success(ctgyInfo, '请求成功')
})

module.exports = router