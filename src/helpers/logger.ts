import * as yaml from 'js-yaml';
import * as util from 'util';

export class Logger {
  static info(...args: any[]) {
    const info = ['INFO', new Date() + ': '];
    // tslint:disable-next-line:no-console
    console.log.apply(console.log, args);
  }
  static error(...args: any[]) {
    const info = ['ERROR', new Date() + ': '];
    // tslint:disable-next-line:no-console
    console.error.apply(console.log, args);
  }

  static console(...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log.apply(console.log, args);
  }

  static deep(value: any, options?) {
    const defaults = {
      depth: null,
      colors: true,
      compact: false,
      maxArrayLength: null,
    };

    if (options) {
      console.log(util.inspect(value, { ...defaults, ...options }));
    } else {
      console.log(util.inspect(value, defaults));
    }
  }

  static yaml(json: any[]) {
    Logger.console(yaml.safeDump(json, { lineWidth: 65535 }));
  }

  static yamlDump(json: any) {
    return yaml.safeDump(json, { lineWidth: 65535 });
  }
}
