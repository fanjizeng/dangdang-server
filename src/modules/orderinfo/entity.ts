export type Orderinfo = {
  orderid?: number // 订单id
  ordertime: string // 订单时间
  customerid: number // 顾客id,就是当前登录的用户
  orderstatus: number 
  orderDetailLst?: OrderDetail[]
}

export type OrderDetail = {
  orderdetailid?: number
  bookname: string
  bookprice: number
  bookpicname: string
  purcharsenum: number
  orderid?: number
  shopcartid?: number // 这个属性数据表没有，是接受前端传递过来的值，保证提交某个订单详情后删除购物车列表中对应的图书信息
}
export type OrdAndOrdDetailLst = {
  orderid: number
  ordertime: string
  customerid: number
  orderstatus: number
  bookname: string
  bookprice: string
  bookpicname: string
  orderdetailid: number
  purcharsenum: number
}[]