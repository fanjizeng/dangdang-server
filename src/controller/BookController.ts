import { Context } from 'koa'
import { get } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import BookDao from '../modules/books/dao/booksDao'
import { success } from '../common/ResResult'
import 'reflect-metadata'

@Controller('/booksmodule')
class CtgyController {
  @get('/findBooksByThirdCtgyId')
  async findSecThrdCtgys(ctx: Context) {
    console.log(ctx.request,'成功')
    const { thirdctgyid, secondctgyid } = ctx.request.body
    const ctgyInfo = await BookDao.findBooksByThirdCtgyId(thirdctgyid)
    ctx.body = success(ctgyInfo, '请求成功')
  }
}

