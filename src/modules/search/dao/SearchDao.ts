import { Op } from 'sequelize'
import { sequelize } from '../../../modules/BaseDao'
import Keyword from '../../decormModel/keyword'
import Historykeyword from '../../decormModel/historykeyword'
class SearchDao {
  static searchDao: SearchDao = new SearchDao()
  // 根据输入的关键字查询搜索关键字列表
  searchKeywords(key: string) {
    const searchKey = `%${key}%`
    return Keyword.findAll({
      raw: true,
      where: {
        keyword: {
          [Op.like]: searchKey
        }
      }
    })
  }
  // 查询是否存在该历史关键字
  searchHistroyKeywords(historykeyword: string) {
    const searchKey = `${historykeyword}`
    return Historykeyword.findOne({
      raw: true,
      where: {
        historykeyword: {
          [Op.like]: searchKey
        }
      }
    })
  }
  // 保存历史关键字方法
  saveHistoryKeywords(historykeyword: string): Promise<[any, any]> { 
    const sql = `INSERT INTO historykeyword(historykeyword,clickcount) VALUES('${historykeyword}',1)`
    return sequelize.query(sql)
  }
  // 更新历史关键字点击次数（每次+1）
  updateHistoryKeywordCount(historykeyword: string): Promise<[any, any]> {
    const sql = `UPDATE historykeyword SET clickcount=clickcount+1 WHERE historykeyword='${historykeyword}'`
    return sequelize.query(sql)
  }
  // 获取搜索历史
  searchHistoryList() {
    return Historykeyword.findAll({
      raw: true,
      order: [['id', 'desc']],
      offset: 0,
      limit: 12
    })
  }
  // 搜索发现
  searchDecovery() {
    return Historykeyword.findAll({
      raw: true, // 获取原始数据
      order: [['clickcount', 'desc']],
      offset: 0,
      limit: 6
    })
  }
  // 删除搜索历史
  deleteSearchHistory() {
    return Historykeyword.destroy({
      truncate: true
    })
  }
  // 删除搜索发现，即清空点击次数最高的六条记录的点击次数
  deleteSearchDecovery(): Promise<[any, any]> {
    const sql = `UPDATE historykeyword
    SET clickcount = 1
    WHERE id IN (
      SELECT id 
      FROM (
        SELECT id FROM historykeyword ORDER BY clickcount DESC LIMIT 6
        ) AS temp
    )`
    return sequelize.query(sql)
  }
}

export default SearchDao.searchDao