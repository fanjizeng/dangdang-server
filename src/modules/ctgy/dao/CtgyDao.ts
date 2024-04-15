import { sequelize } from '../../../modules/BaseDao'
import { findAllFirstCtgy, findThirdCtgyBySecId } from '../model/OneToMany'
import convert from '../../../tstypes/index'
type SecThrCtgyList = {
  secondctgyid: number,
  secctgyname: string,
  firstctgyId: number,
  thirdctgyid: number,
  thirdctgyname: string,
  secctgyid: number
}[]

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  async findFstCtgys() {
    return findAllFirstCtgy()
  }
  async getThirdBySecId(secctgyId: number) {
    return findThirdCtgyBySecId(secctgyId)
  }
  async findSecThrdCtgys(firstctgyid: number) {
    const sql =
      `SELECT * from secondctgy sc INNER JOIN thirdctgy tc on sc.secondctgyid=tc.secctgyid where sc.firstctgyid=${firstctgyid};`
    const secThrCtgys = (await sequelize.query(sql))[0] as SecThrCtgyList
    // return (await sequelize.query(sql))[0]
    return convert(secThrCtgys, ['secondctgyid', 'secctgyname'], ['thirdctgyid', 'thirdctgyname', 'secctgyid'], 'secondctgyid', 'secctgyid', 'thirdctgyList')
  }
  async findThirdCtgy(thirdctgyid: number) {
    const sql =
      `SELECT 
        tc.thirdctgyid,
        tc.thirdctgyname,
        tc.secctgyid,
        sc.secctgyname,
        fc.firstctgyname,
        fc.firstCtgyId
        from thirdctgy tc LEFT JOIN secondctgy sc on sc.secondctgyid=tc.secctgyid LEFT JOIN firstctgy fc on fc.firstCtgyId=sc.firstctgyId where tc.thirdctgyid=${thirdctgyid}
        LIMIT 1`
    const thirdCtgy = (await sequelize.query(sql))[0][0]
    if(!thirdCtgy) {
      return {}
    }
    return thirdCtgy
  }
}

export default CtgyDao.ctgyDao