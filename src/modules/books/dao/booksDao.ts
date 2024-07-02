import {Op} from 'sequelize'
import { sequelize } from '../../../modules/BaseDao'
import Books from '../../../modules/decormModel/books'
import { getNoReptItem } from '../../../tstypes/index' 
import pager from '@/common/PageUtil'
import { pagerDecoraotr } from '@/common/PageUtil'
interface bookQuery {
  sortField: string
  ascOrDesc: 'asc' | 'desc' | string
  secondctgyid?: number
  thirdctgyid?: number | null
  [propName: string]: any
}
function removeEmptyProperties(obj: bookQuery, model: string): string {
  let condition = ''
  for (const key in obj) {
    const value = obj[key];
    if (!['', null, undefined].includes(value) && !['sortField', 'ascOrDesc'].includes(key)) {
      if (condition === '') {
        condition = `${model}.${key}=${value}`
      } else
        condition = `${condition} AND ${model}.${key}=${value}`
    }
  }
  if (obj.sortField) {
    condition = `${condition} ORDER BY ${obj.sortField} ${obj.ascOrDesc === 'asc' ? 'asc' : 'desc'}`
  }
  return condition;
}
class BookDao {
  static bookDao: BookDao = new BookDao()
  
  async findBookLstWithPager(curPageNo: string) {
    const basePagerSql = "SELECT * FROM books LIMIT"
    const recTotalNumSql = "SELECT count(isbn) from books"
    const countPageField = 'isbn'
    await this.bookPager(curPageNo, basePagerSql, recTotalNumSql, countPageField)
    return pager.getCurPageData()
  }

  @pagerDecoraotr(sequelize)
  bookPager(curPageNo: string, basePagerSql: string, recTotalNumSql: string, countPageField: string) {
  }
  // async findBookLstWithPager(curPageNo: string): Promise<any[]> {
  //   const firstRecNo = pager.getFirstRecNoCurPage(curPageNo)
  //   const sql = `SELECT * FROM books LIMIT ${firstRecNo}, ${pager.PageSize}`
  //   const curPageDataList = (await sequelize.query(sql))[0]
  //   const totalRecNumObj = (await sequelize.query('SELECT count(isbn) from books')) as any
  //   // { 'count(isbn)': 25}
  //   const totalRecNum = totalRecNumObj['count(isbn)']
  //   const totalPageNum = pager.getTotalPageNum(totalRecNum)
  //   console.log('totalPageNum:', totalPageNum)
  //   return curPageDataList
  // }
  async findBooksByThirdCtgyId(query: bookQuery) {
    let condition = removeEmptyProperties(query, 'Books')
    const sql = `SELECT * from books where ${condition}`
    const books = (await sequelize.query(sql))[0]
    return books
  }
  
  async findBooksByAutoCompKeyword(autocompKeyword: string): Promise<Books[]> {
    return await Books.findAll({
      raw: true,
      where: {
        bookname: {
          [Op.like]: `%${autocompKeyword}%`
        }
      }
    })
  }
  async findPublishersByAutoCompKeyword(autocompKeyword: string) {
    const res =  await Books.findAll({
      attributes: ['publishid', 'publishername'],
      raw: true,
      where: {
        bookname: {
          [Op.like]: `%${autocompKeyword}%`
        }
      }
    })
    return getNoReptItem(res, 'publishername')
  }
  async findBksBypublishIds(publishids: number[]) {
    return await Books.findAll({
      raw: true,
      where: {
        publishid: {
          [Op.in]: publishids
        }
      }
    })
  }
  async findBooksByISBN(isbn: string) {
    return Books.findOne({
      raw: true,
      where: {
        ISBN: isbn
      }
    })
  }
}

export default BookDao.bookDao