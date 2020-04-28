import * as yaml from 'js-yaml';

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

  static yaml(json: any[]) {
    Logger.console(yaml.safeDump(json, { lineWidth: 65535 }));
  }

  static yamlDump(json: any) {
    return yaml.safeDump(json, { lineWidth: 65535 });
  }
}
