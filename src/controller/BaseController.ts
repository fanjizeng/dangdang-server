import jwt, { JwtPayload } from 'jsonwebtoken'
class BaseController {
  static verifyToken(token: string) {
    const result = jwt.verify(token, 'jashf09033239') as JwtPayload
    return result ? result.data : undefined
  }
}
export const { verifyToken } = BaseController