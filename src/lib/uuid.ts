// @ts-ignore
import { v4, v1, v5 } from 'uuid';

export class Uuid {
  static async v1() {
    return v1();
  }
  static async v4() {
    return v4();
  }
  static async v5(name: string, namespace: string) {
    let _nameSpace = '';
    switch (namespace) {
      case 'dns':
        _nameSpace = v5.DNS;
        break;
      case 'url':
        _nameSpace = v5.URL;
        break;
      default:
        _nameSpace = namespace;
    }
    return v5(name, _nameSpace);
  }
}
