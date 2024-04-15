import { Context } from 'koa'
import { get, post, del } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import ShopCartDao from '../modules/shopcart/dao/ShopCartDao'
import { success } from '../common/ResResult'
import 'reflect-metadata'
import ShopCartService from '../modules/shopcart/service/ShopCartService'

@Controller('/shopcartmodule')
class ShopCartController {
  @get('/findUserShopCartList/:userid')
  async findUserShopCartList(ctx: Context) {
    const request = ctx.params // 拿到请求对象
    const { userid } = request
    const shopCartList = await ShopCartDao.findUserShopCartList(Number(userid))
    ctx.body = success(shopCartList, '请求成功')
  }
  // 添加图书到购物车
  @post("/addBookToShopCart")
  async addBookToShopCart(ctx: Context) {
    const shopCartRaw = ctx.request.body
    const dbshopCart = await ShopCartService.addBookToShopCart(shopCartRaw)
    ctx.body = success(dbshopCart, '请求成功')
  }
  // 更新图书购物车数量
  @post("/appOrSubtrBookFrmShopCart")
  async appOrSubtrBookFrmShopCart(ctx: Context) {
    const shopCartRaw_ = ctx.request.body
    await ShopCartService.appOrSubtrBookFrmShopCart(shopCartRaw_)
    ctx.body = success(null, '请求成功')
  }
  // 删除购物车图书
  @del("/deOneBookFrmSc/:shopcartid")
  async deOneBookFrmSc(ctx: Context) {
    const { shopcartid } = ctx.params
    const delRecNum = await ShopCartService.deOneBookFrmSc(shopcartid)
    ctx.body = success(delRecNum, '删除成功')
  }
}

