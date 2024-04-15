import { sequelize } from '../../../modules/BaseDao'
import Books from '../../../modules/decormModel/books'

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

  async findBooksByThirdCtgyId(query: bookQuery) {
    let condition = removeEmptyProperties(query, 'Books')
    const sql = `SELECT * from books where ${condition}`
    const books = (await sequelize.query(sql))[0]
    return books
  }
}

export default BookDao.bookDao