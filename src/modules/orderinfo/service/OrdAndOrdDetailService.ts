import { Orderinfo } from '../entity'
import OrdAndOrdDetailDao from '../dao/OrdAndOrdDetailDao'
import { addEntryToArr } from '@/tstypes/index'
import ShopCartDao from '@/modules/shopcart/dao/ShopCartDao'
import convert from '../moduletypes'
class OrdAndOrdDetailService {
  static ordAndOrdDetailService: OrdAndOrdDetailService = new OrdAndOrdDetailService()
  async submitOrder(ordAndOrdDetail: Orderinfo) {
    // 1. 保存订单
    const orderinfo: Orderinfo = {
      ordertime: ordAndOrdDetail.ordertime,
      customerid: ordAndOrdDetail.customerid,
      orderstatus: 1
    }
    const dbOrderid: number = (await OrdAndOrdDetailDao.addOrderinfo(orderinfo))[0]
    ordAndOrdDetail.orderid = dbOrderid
    // 2. 拼接订单id和订单详情
    const orderDetailLst = ordAndOrdDetail.orderDetailLst!
    const lastOrderDetailLst = addEntryToArr(orderDetailLst, 'orderid', dbOrderid)
    // 3. 保存订单详情
    let ordAndOrderDetailId: number
    for(let orderDetail of lastOrderDetailLst) {
      ordAndOrderDetailId = (await OrdAndOrdDetailDao.addOrderDetail(orderDetail))[0]
      orderDetail.orderdetailid = ordAndOrderDetailId
      // 4. 删除对应购物车列表图书记录
      await ShopCartDao.deOneBookFrmSc(orderDetail.shopcartid!)
    }
    return lastOrderDetailLst
  }
  async findCurUsrOrdAndOrdDetail(customerid: string) {
    return convert((await OrdAndOrdDetailDao.findCurUsrOrdAndOrdDetail(customerid))[0])
  }
  async uptOrdStatusByOrdId(orderid: number) {
    return (await OrdAndOrdDetailDao.uptOrdStatusByOrdId(orderid))[0].affectedRows
  }
}
export default OrdAndOrdDetailService.ordAndOrdDetailService