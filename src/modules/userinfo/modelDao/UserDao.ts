import model from '../../decormModel/UserInfo'

class UserDao {
  static userDao: UserDao = new UserDao()
  findAuser() {
    return model.findAll({
      raw: true
    })
  }
}

export default UserDao.userDao
