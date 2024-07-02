import { toNumber } from './StringUtil'
import type { Sequelize } from 'sequelize'
class Pager {
  static pager: Pager = new Pager()
  private firstRecNoCurPage!: number // 每一页的第一条记录号是多少
  private pageSize: number = 4 // 每一页总共最大多少条记录
  private curPageNo: number = 1 // 当前是第几页，默认第一页
  private totalPageNumber: number = 0
  private curPageDataList: any[] = []
  // 获取每一页第一条记录号
  getFirstRecNoCurPage(curPageNo_: string, pageSize_: string = '0') {
    this.curPageNo = toNumber(curPageNo_) || this.curPageNo
    this.pageSize = toNumber(pageSize_) || this.pageSize
    this.firstRecNoCurPage = (this.curPageNo - 1) * this.pageSize
    return this.firstRecNoCurPage
  }
  // 保存当前页数据
  saveCurPageData(_curPageDataList: any[]) {
    this.curPageDataList = _curPageDataList
  }
  // 当前页数据
  getCurPageData() {
    return {
      curPageNo: this.curPageNo,
      curPageDataList: this.curPageDataList,
      totalPageNumber: this.totalPageNumber
    }
  }
  get PageSize() {
    return this.pageSize
  }
  // 获取总页数
  getTotalPageNum(totalRecNum: number) {
    if (totalRecNum % this.pageSize === 0) {
      this.totalPageNumber = totalRecNum / this.pageSize
    } else {
      this.totalPageNumber = Math.ceil(totalRecNum / this.pageSize)
    }
  }
}
const pager = Pager.pager
export default pager
type PageParamsType = [curPageNo: string, basePagerSql: string, recTotalNumSql: string, countPageField: string]
export function pagerDecoraotr(sequelize: Sequelize) {
  return (targetPrototype: any, methodname: string, dataProps: PropertyDescriptor) => {
    const targetMethod = dataProps.value
    dataProps.value = async (...args: PageParamsType) => {
      const [curPageNo, basePagerSql, recTotalNumSql, countPageField] = args
      const firstRecNo = pager.getFirstRecNoCurPage(curPageNo)
      const sql = `${basePagerSql} ${firstRecNo},${pager.PageSize}`
      const curPageDataList = (await sequelize.query(sql))[0]
      const totalRecNumObj = (await sequelize.query(`${recTotalNumSql}`))[0][0] as any
      pager.getTotalPageNum(totalRecNumObj[`count(${countPageField})`])
      pager.saveCurPageData(curPageDataList)
    }
  }
}