enum Code {
  SUCCESS = 200,
  SERVER_ERROR = 500
}
class ResRult {
  static success(data: any = undefined, msg: any = '') {
    const code: Code = Code.SUCCESS
    return { data, msg, code}
  }
  static fail(msg: any = '', status?: number) {
    const code = status ? status : Code.SERVER_ERROR
    return { undefined, msg, code}
  }
}

export const{
  success,
  fail
} = ResRult