import * as jwt from 'jsonwebtoken';
import { Uuid } from './uuid';

export class Jwt {
  async generate(secret, options?) {
    let payload: any = {};
    if (options) {
      payload = options;
    } else {
      payload.jti = await Uuid.v4();
    }
    const token = jwt.sign(payload, secret);
    return token;
  }

  async decode(payload) {
    const decoded = jwt.decode(payload.trim(), { complete: true });
    return decoded;
  }

  async verify(token, secret) {
    jwt.verify(token, secret);
  }
}
