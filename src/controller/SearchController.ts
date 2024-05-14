import { Context } from 'koa'
import { get, post } from '../decorator/reqmenthoddecorator'
import { Controller } from '../decorator/controllerdecorator'
import SearchService from '../modules/search/service/SearchService'
import { success } from '../common/ResResult'
import 'reflect-metadata'

@Controller('/searchmodule')
class SearchController {
  @post('/addOrUpdateHistoryKeyword')
  async addOrUpdateHistoryKeyword(ctx: Context) {
    const request = ctx.request.body; // 拿到请求对象
    const { historyKeyword } = request
    const result = await SearchService.addOrUpdateHistoryKeyword(historyKeyword)
    ctx.body = success(result, '请求成功')
  }
  @get('/searchKeywords/:key')
  async searchKeywords(ctx: Context) {
    const { key } = ctx.params; // 拿到请求参数
    const result = await SearchService.searchKeywords(key)
    ctx.body = success(result, '请求成功')
  }
  @get('/searchDecovery')
  async searchDecovery(ctx: Context) {
    const result = await SearchService.searchDecovery()
    ctx.body = success(result, '请求成功')
  }
  @get('/searchHistoryList')
  async searchHistoryList(ctx: Context) {
    const result = await SearchService.searchHistoryList()
    ctx.body = success(result, '请求成功')
  }
  @get('/deleteSearchDecovery')
  async deleteSearchDecovery(ctx: Context) {
    const result = await SearchService.deleteSearchDecovery()
    ctx.body = success(result, '请求成功')
  }
  @get('/deleteSearchHistory')
  async deleteSearchHistory(ctx: Context) {
    const result = await SearchService.deleteSearchHistory()
    ctx.body = success(result, '请求成功')
  }
}

