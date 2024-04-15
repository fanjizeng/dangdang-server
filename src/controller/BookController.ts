import { Context } from 'koa'
import { get } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import BookDao from '../modules/books/dao/booksDao'
import { success } from '../common/ResResult'
import 'reflect-metadata'

@Controller('/booksmodule')
class BookController {
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
}

