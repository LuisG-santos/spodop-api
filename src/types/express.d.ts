import { JwtPayload } from 'jsonwebtoken';
export interface AuthUser{
    sub: string,
    name: string,
    email: string
}
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}