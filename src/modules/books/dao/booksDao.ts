import Books from '../../../modules/decormModel/books'

class BookDao {
  static bookDao: BookDao = new BookDao()

  async findBooksByThirdCtgyId(thirdctgyid: number) {
    return await Books.findAll({
      raw: true,
      where: {
        thirdctgyid
      }
    })
  }
}

export default BookDao.bookDao