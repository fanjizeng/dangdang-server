import { findAllFirstCtgy } from '../model/OneToMany'
import CtgyDao from '../dao/CtgyDao'
import type Ctgys from '../../decormModel/ctgys'
import redisUtil from '../../../common/RedisUtil'

class CtgyService {
  static ctgyService: CtgyService = new CtgyService()
  async findFirstCtgys(): Promise<Ctgys[]>  {
    const firstCtgysRedis = await redisUtil.hget('firstCtgysHash', 'firstCtgys')
    if(!firstCtgysRedis) {
      // 第一次进来没数据，redis就没有数据，去查询mysql
      const firstCtgys = await CtgyDao.findFstCtgys()
      redisUtil.hset('firstCtgysHash', 'firstCtgys', firstCtgys)
      return firstCtgys
    }else {
      console.log('进入缓存')
      return firstCtgysRedis
    } 
  }
}

export default CtgyService.ctgyService