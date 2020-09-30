import * as jwt from 'jsonwebtoken';

import { IAuth } from './IAuth';
import { User } from '../../users/domain/User';

export class JWT implements IAuth<User> {
  getToken(user: User): string {
    return jwt.sign({
      email: user.email,
      sub: user.id.toValue(),
      iss: 'https://auth.test.io/basic',
    }, 'secret', {
      algorithm: 'HS256',
    });
  }

  async getUser(token: string): Promise<string> {
    if (!token) return null;

    try {
      const jwtToken: any = jwt.verify(token.replace('Bearer ', ''), 'secret');
      return jwtToken?.sub;
    } catch (err) {
      return null;
    }
  }
}
