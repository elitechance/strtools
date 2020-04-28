import { Base64 as JSBase64 } from 'js-base64';

export class Base64 {
  static async encode(str: string) {
    return JSBase64.encode(str);
  }
  static async decode(str: string) {
    return JSBase64.decode(str);
  }
}
