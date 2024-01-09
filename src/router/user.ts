import { Context } from 'koa'
import Router from 'koa-router'
import { success } from '../common/ResResult'
import { addUser, findAllUser, findByUsmAndPsw, findByLike, countUserinfo, findPage } from '../dao/UserDaoDefine'
import OrmUser from '../dao/UserDaoOrm'
const router = new Router()

router.prefix('/usermodule')

router.get("/findUserinfo/:username/:password", async (ctx: Context) => {
  const { username, password } = ctx.params
  const userInfo = await findByUsmAndPsw(username, password)
  ctx.body = success(userInfo, '请求成功')
})
router.get("/findByLike/:key", async (ctx: Context) => {
  const { key } = ctx.params
  const userInfo = await findByLike(key)
  ctx.body = success(userInfo, '请求成功')
})
router.get("/findAllUser", async (ctx: Context) => {
  const userInfo = await findAllUser()
  ctx.body = success(userInfo, '获取全部数据')
})
router.get("/findAUser", async (ctx: Context) => {
  const userInfo = await OrmUser.findAuser()
  ctx.body = success(userInfo, '获取全部数据')
})

router.post('/addUser', async (ctx: Context) => {
  const user = ctx.request.body
  const dbUserinfo = await addUser(user)
  ctx.body = success(dbUserinfo, '请求成功')
})
router.get('/getAddressTotal/:key', async (ctx: Context) => {
  const { key } = ctx.params
  if(key && typeof key === 'string') {
    const dbUserinfo = await countUserinfo(parseInt(key))
    ctx.body = success(dbUserinfo, '请求成功')
  }
})
router.get('/findUserWithPage/:pageNo/:pageSize', async (ctx: Context) => {
  const { pageNo, pageSize } = ctx.params
  const offset = (pageNo -1) * pageSize
  if(pageNo && typeof pageNo === 'string') {
    const dbUserinfo = await findPage(offset, parseInt(pageSize))
    ctx.body = success(dbUserinfo, '请求成功')
  }
})

module.exports = router