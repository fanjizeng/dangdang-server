import './BaseDaoOrm'
import UserInfoModel from '../ormModel/UserInfo'

class UserDaoOrm {
  static userDaoOrm: UserDaoOrm = new UserDaoOrm()

  findAuser() {
    return UserInfoModel.findAll()
  }
}

export default UserDaoOrm.userDaoOrm