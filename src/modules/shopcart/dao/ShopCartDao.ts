import { sequelize } from "../../../modules/BaseDao";
import ShopCart from "../../../modules/decormModel/shopcart";
import { ShopCartRaw, ShopCartRaw_ } from '../raw'

class ShopCartDao {
  static shopCartDao: ShopCartDao = new ShopCartDao()
  async findUserShopCartList(userid: number) {
    return await ShopCart.findAll({
      raw: true,
      where: {
        userid
      }
    })
  }
  async addBookToShopCart(shopCart: ShopCartRaw): Promise<[any, any]> {
    const sql = `INSERT INTO shopcart (bookisbn, bookname, bookpicname, bookprice, userid, purcharsenum)
      VALUES ('${shopCart.bookisbn}','${shopCart.bookname}','${shopCart.bookpicname}',${shopCart.bookprice},${shopCart.userid},${shopCart.purcharsenum})`
    return await sequelize.query(sql)
  }
  async appOrSubtrBookFrmShopCart(shopCart: ShopCartRaw_): Promise<[any, any]> {
    const sql = `UPDATE shopcart SET purcharsenum=${shopCart.purcharsenum} WHERE shopcartid=${shopCart.shopcartid}`
    return await sequelize.query(sql)
  }
  async deOneBookFrmSc(shopcartid: number) {
    return ShopCart.destroy({
      where: {
        shopcartid
      }
    })
  }
}
export default ShopCartDao.shopCartDao