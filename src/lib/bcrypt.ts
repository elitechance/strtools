import * as bcrypt from 'bcryptjs';
import { promisify } from 'util';

export class Bcrypt {
  static async hash(rawPassword: string, rounds: number) {
    const hash = promisify(bcrypt.hash.bind(bcrypt));
    const response = await hash(rawPassword, rounds);
    return response;
  }

  static async salt(saltRounds: number) {
    const genSalt = promisify(bcrypt.genSalt.bind(bcrypt));
    const response = await genSalt(saltRounds);
    return response;
  }

  static async match(rawPassword: string, hash: string) {
    const compare = promisify(bcrypt.compare.bind(bcrypt));
    const response = await compare(rawPassword, hash);
    return response;
  }
}
