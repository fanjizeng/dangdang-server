function isString(data: any): data is string {
  return typeof data === 'string'
}

export interface DbConconf {
  host: string
  user: string
  password: string
  port: number
  database: string
}
interface EnvConf {
  dev: DbConconf
  prod: DbConconf
}
class Conf {
  static conf: Conf = new Conf()
  env!: keyof EnvConf
  envConf!: EnvConf
  defaultDbConf: DbConconf = {
    host: 'localhost',
    user: 'hansen',
    password: '123456',
    database: 'DANG_DATA',
    port: 3306
  }
  constructor() {
    console.log('当前环境', process.env.NODE_ENV)
    this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
    this.initConf()
  }
  initConf() {
    this.envConf = {
      dev: {
        host: 'localhost',
        user: 'hansen',
        password: 'zeng940908',
        database: 'DANG_DATA',
        port: 3306
      },
      prod: {
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'DANG_DATA',
        port: 3306
      }
    }
  }

  getConf():DbConconf;
  getConf(key: string):string;
  getConf(key: any=''):any {
    if(this.isDbConCOnfKeys(key) && key.length > 0) {
      return this.envConf[this.env][key]
    }else {
      return this.envConf[this.env]
    }
  }
  checkPropertyExists<T extends object, K extends keyof T>(obj: T, prop: K): boolean {
    return prop in obj
  }
  isDbConCOnfKeys(key: any):key is keyof DbConconf {
    return ['host', 'user', 'password', 'database', 'port'].includes(key)
  }
}

export default Conf.conf