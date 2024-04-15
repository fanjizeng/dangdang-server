import redisConfig, { RedisClient } from '../config/RedisConfig'

class RedisUtil implements RedisClient {
  static redisUtil: RedisUtil = new RedisUtil()
  static redisClient: RedisClient = redisConfig.redisServerCon()
  set(key: string, value: string) {
    throw new Error('Method not implemented.')
  }
  get(key: string){
    throw new Error('Method not implemented.')
  }
  async hset(obj: string, key: string, value: any){
    await RedisUtil.redisClient.hset(obj, key, JSON.stringify(value))
  }
  hmset(obj: string, ...keyvalue: any[]){
    throw new Error('Method not implemented.')
  }
  hgetall(obj: string){
    throw new Error('Method not implemented.')
  }
  async hget(obj: string, key: string){
    const value = await RedisUtil.redisClient.hget(obj, key)
    return value ? JSON.parse(value) : undefined
  }
  hmget(obj: string, ...keys: any[]){
    throw new Error('Method not implemented.')
  }
}
export default RedisUtil.redisUtil
