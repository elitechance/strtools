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
}
