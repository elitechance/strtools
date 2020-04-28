import { JSONPath } from 'jsonpath-plus';

export class JsonPath {
  static async extract(json: any, path: string) {
    return JSONPath({ path: path, json: json });
  }
}
