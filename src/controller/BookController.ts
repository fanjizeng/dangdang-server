import { Context } from 'koa'
import { get, post } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import BookDao from '../modules/books/dao/booksDao'
import { success } from '../common/ResResult'
import 'reflect-metadata'

@Controller('/booksmodule')
class BookController {
  @get('/findBookLstWithPager/:curPageNo')
  async findBookLstWithPager(ctx: Context) {
    const { curPageNo } = ctx.params
    const curPageDataList = await BookDao.findBookLstWithPager(curPageNo)
    ctx.body = success(curPageDataList)
  } 
  @get('/findBooksByThirdCtgyId')
  async findSecThrdCtgys(ctx: Context) {
    const request = ctx.query; // 拿到请求对象
    const { thirdctgyid, secondctgyid, sortField, ascOrDesc } = request
    const query = {
      thirdctgyid: thirdctgyid ? Number(thirdctgyid) : null,
      secondctgyid: secondctgyid ? Number(secondctgyid) : 0,
      sortField: sortField ? String(sortField) : '',
      ascOrDesc: ascOrDesc === 'asc' ? 'asc' : 'desc'
    }
    const ctgyInfo = await BookDao.findBooksByThirdCtgyId(query)
    ctx.body = success(ctgyInfo, '请求成功')
  }
  @get('/findBooksByAutoCompKeyword/:autocompKeyword')
  async findBooksByAutoCompKeyword(ctx: Context) {
    const request = ctx.params; // 拿到请求对象
    const { autocompKeyword  } = request
    const bookList = await BookDao.findBooksByAutoCompKeyword(autocompKeyword)
    ctx.body = success(bookList, '请求成功')
  }
  @get('/findPublishersByAutoCompKeyword/:autocompKeyword')
  async findPublishersByAutoCompKeyword(ctx: Context) {
    const request = ctx.params; // 拿到请求对象
    const { autocompKeyword  } = request
    const res = await BookDao.findPublishersByAutoCompKeyword(autocompKeyword)
    ctx.body = success(res, '请求成功')
  }
  @get('/findBooksByISBN/:isbn')
  async findBooksByISBN(ctx: Context) {
    const request = ctx.params; // 拿到请求对象
    const { isbn  } = request
    const res = await BookDao.findBooksByISBN(isbn)
    ctx.body = success(res, '请求成功')
  }
  @post('/findBksBypublishIds')
  async findBksBypublishIds(ctx: Context) {
    const publishids: number[] = ctx.request.body
    const books = await BookDao.findBksBypublishIds(publishids)
    ctx.body = success(books, '请求成功')
  }
} 

