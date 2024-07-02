import { sequelize } from '@/modules/BaseDao'
import { Orderinfo, OrderDetail} from '../entity'

class OrdAndOrdDetailDao {
  static ordAndOrdDetailDao: OrdAndOrdDetailDao = new OrdAndOrdDetailDao()

  async addOrderinfo(orderinfo: Orderinfo):Promise<[any, any]> {
    const sql = `INSERT INTO orderinfo(ordertime, customerid, orderstatus) VALUES('${orderinfo.ordertime}', ${orderinfo.customerid}, ${orderinfo.orderstatus})`
    return await sequelize.query(sql)
  }
  async addOrderDetail(orderdetail: OrderDetail):Promise<[any, any]> {
    const sql = `INSERT INTO orderdetail(bookname, bookprice, bookpicname, purcharsenum, orderid) VALUES('${orderdetail.bookname}', ${orderdetail.bookprice}, '${orderdetail.bookpicname}', ${orderdetail.purcharsenum}, ${orderdetail.orderid})`
    return await sequelize.query(sql)
  }
  async findCurUsrOrdAndOrdDetail(customerid: string):Promise<[any, any]> {
    const sql = `SELECT oi.orderid, date_format(oi.ordertime, '%Y-%m-%d %H:%i:%s') as ordertime, oi.customerid,oi.orderstatus,
    odi.bookname,odi.bookprice,odi.bookpicname,odi.orderdetailid,odi.purcharsenum
    FROM orderinfo oi
      INNER JOIN orderdetail odi
      ON oi.orderid=odi.orderid AND oi.customerid=${customerid}`
    return await sequelize.query(sql)
  }
  async uptOrdStatusByOrdId(oederid: number): Promise<[any, any]> {
    const sql = `UPDATE orderinfo SET orderstatus=-1 WHERE orderid=${oederid}`
    return await sequelize.query(sql)
  }
}
export default OrdAndOrdDetailDao.ordAndOrdDetailDao