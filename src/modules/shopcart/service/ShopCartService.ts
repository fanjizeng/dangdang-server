import shopCartDao from '../dao/ShopCartDao'
import { ShopCartRaw, ShopCartRaw_ } from '../raw'
import { combine } from '../../../tstypes/index'
class ShopCartService {
  static shopCartService: ShopCartService = new ShopCartService()
  async findUserShopCartList(userid: number) {
    return await shopCartDao.findUserShopCartList(userid)
  }
  async addBookToShopCart(shopCart: ShopCartRaw) {
    const result = await shopCartDao.addBookToShopCart(shopCart)
    return combine({ shopcartid: result[0] }, shopCart)
  }
  async appOrSubtrBookFrmShopCart(shopCart: ShopCartRaw_) {
    await shopCartDao.appOrSubtrBookFrmShopCart(shopCart)
    return shopCart
  }
  async deOneBookFrmSc(shopcartid: number) {
    return await shopCartDao.deOneBookFrmSc(shopcartid)
  }
}
export default ShopCartService.shopCartService