import { Context } from 'koa'
import { get, post } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import OrdAndOrdDetailService from '../modules/orderinfo/service/OrdAndOrdDetailService'
import OrdAndOrdDetailDao from '../modules/orderinfo/dao/OrdAndOrdDetailDao'
import { success } from '../common/ResResult'
import 'reflect-metadata'

@Controller('/ordAndOrdDetailmodule')
class OrdAndOrdDetailController {
  @post('/addOrdAndOrdDetail')
  async addOrdAndOrdDetail(ctx: Context) {
    const ordAndOrdDetail = ctx.request.body
    const lastOrderDetailLst = await OrdAndOrdDetailService.submitOrder(ordAndOrdDetail)
    ctx.body = success(lastOrderDetailLst)
  }
  @get('/findCurUsrOrdAndOrdDetail/:customerid')
  async findCurUsrOrdAndOrdDetail(ctx: Context) {
    const { customerid } = ctx.params
    const res = await OrdAndOrdDetailService.findCurUsrOrdAndOrdDetail(customerid)
    ctx.body = success(res)
  }
  @get('/uptOrdStatusByOrdId/:orderid')
  async uptOrdStatusByOrdId(ctx: Context) {
    const { orderid } = ctx.params
    const res = await OrdAndOrdDetailService.uptOrdStatusByOrdId(orderid)
    ctx.body = success(res)
  }
}