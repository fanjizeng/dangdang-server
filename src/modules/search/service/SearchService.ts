import searchDao from '../dao/SearchDao'

class SearchService {
  static searchService: SearchService = new SearchService()
  async addOrUpdateHistoryKeyword(historyKeyword: string) {
    const dbHistoryKeyword = await searchDao.searchHistroyKeywords(historyKeyword)
    if (dbHistoryKeyword) {
      // 更新关键字次数
      const result: [{ affectedRows: number }, any] = await searchDao.updateHistoryKeywordCount(historyKeyword)
      return result[0].affectedRows
    } else {
      const result: [number, number] = await searchDao.saveHistoryKeywords(historyKeyword)
      return result[0]
    }
  }
  async searchKeywords(key: string) {
    return await searchDao.searchKeywords(key)
  }
  async searchDecovery() {
    return await searchDao.searchDecovery()
  }
  async searchHistoryList() {
    return await searchDao.searchHistoryList()
  }
  async deleteSearchHistory() {
    return await searchDao.deleteSearchHistory()
  }
  async deleteSearchDecovery() {
    const result: [{ affectedRows: number }, any] =  await searchDao.deleteSearchDecovery()
    return result[0].affectedRows
  }
}
export default SearchService.searchService