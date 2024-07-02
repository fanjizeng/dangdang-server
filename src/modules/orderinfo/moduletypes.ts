import { getNoReptItem, combineRelativeCtgy, combine, EleOfArr, getSubItemFrmArr} from '@/tstypes'
import { OrdAndOrdDetailLst } from './entity'

export default function convert(ordAndOrdDetailLst: OrdAndOrdDetailLst) {
  // 1. 获取订单数组--orderinfoList
  let orderinfoList = getSubItemFrmArr(ordAndOrdDetailLst, 'orderid', 'ordertime', 'customerid', 'orderstatus')
  // 2. 去重后的订单数组--noReptOrdList
  let noReptOrdList = getNoReptItem(orderinfoList, 'orderid')
  // 3. 获取订单详情数组--ordDetailList
  let ordDetailList = getSubItemFrmArr(ordAndOrdDetailLst, 'orderid', 'bookname', 'bookprice', 'bookpicname', 'purcharsenum', 'orderdetailid')
  // 4. 给去重的订单数组的每个元素都增加 { "orderDetailLst": []}
  const relativeOrdAndDetailList = combineRelativeCtgy(noReptOrdList, 'orderDetailLst', [])
  // 5. 根据第4步，定义返回前端的关联订单和订单详情数组变量
  const lastRelativeOrdAndDetailLst: typeof relativeOrdAndDetailList = []
  // 6. 获取第4步数组的元素类型
  type relativeOrdAndDetail = EleOfArr<typeof relativeOrdAndDetailList>
  
  // 7. 迭代去重后的订单数组
  noReptOrdList.map(noReptOrd => {
    // 7.1 定义第3步订单详情数组类型的变量
    const lastOrdDetailLst: typeof ordDetailList = []
    // 7.2 迭代第3步订单详情数组并比较每一个详情中的订单id和去重后订单数组迭代出来的变量保存待7.1的变量中
    ordDetailList.forEach((ordDetail) => {
      if(ordDetail.orderid === noReptOrd.orderid) {
        lastOrdDetailLst.push({
          orderid: ordDetail.orderid,
          bookname: ordDetail.bookname,
          bookprice: ordDetail.bookprice,
          bookpicname: ordDetail.bookpicname,
          purcharsenum: ordDetail.purcharsenum,
          orderdetailid: ordDetail.orderdetailid
        })
      }
    })
    // 7.3 合并去重订单迭代出来的订单元素和7.1定义的变量{ orderDetailLst: 7.1: 变量}
    const lastRelativeOrdAndDetail: relativeOrdAndDetail = combine(noReptOrd, {orderDetailLst: lastOrdDetailLst})
    // 7.4 把7.3合并的结果保存到第5步的变量中
    lastRelativeOrdAndDetailLst.push(lastRelativeOrdAndDetail)
  })
  // 返回给上层，也是最终返回给前端的订单和订单详情数组
  return lastRelativeOrdAndDetailLst
}