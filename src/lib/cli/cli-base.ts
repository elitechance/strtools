import * as commander from 'commander';

import * as fs from 'fs';
export abstract class CliBase {
  protected toolName = 'strtools';
  protected handler = commander;
  protected commandName: string;
  protected options: any;

  getFromStdin() {
    const stdinBuffer = fs.readFileSync(0);
    return stdinBuffer.toString();
  }

  getPrintOptions() {
    let options: any = {};
    if (this.options.color) {
      if (this.options.color === 'false') options.colors = false;
      if (this.options.color === 'true') options.colors = true;
      if (this.options.color === '1') options.colors = true;
      if (this.options.color === '0') options.colors = false;
    }
    if (this.options.compact) {
      if (this.options.compact === 'false') options.compact = false;
      if (this.options.compact === 'true') options.compact = true;
      if (this.options.compact === '1') options.compact = true;
      if (this.options.compact === '0') options.compact = false;
    }
    if (Object.keys(options).length) {
      return options;
    }
  }
}
