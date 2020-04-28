import { CliBase } from './cli-base';
import { Logger } from '../../helpers/logger';
import { JsonPath } from '../json-path';

export class JsonPathCli extends CliBase {
  protected commandName = 'jp';
  constructor() {
    super();
    this.handler
      .command(`${this.commandName} <path>`)
      .option('-j, --json <string>', 'JSON string')
      .option('-s, --stringify', 'Stringify output')
      .on('--help', this.help.bind(this))
      .action(this.processCommand.bind(this));
  }

  protected async processCommand(path: string, options: any) {
    try {
      let json = options.json;
      if (!json) {
        json = this.getFromStdin();
      }
      const parsed = JSON.parse(json);
      const value = await JsonPath.extract(parsed, path);
      if (options.stringify) {
        Logger.console(JSON.stringify(value[0]));
      } else {
        Logger.console(value[0]);
      }
    } catch (error) {
      if (error.message) {
        Logger.error(error.message);
      } else {
        Logger.error(error);
      }
      process.exit(1);
    }
  }

  private help() {
    const sampleString = `[1,2,3,4]`;
    const object = JSON.stringify({ one: 1, two: 2, array: [1, 2, 3, 4] });
    const message = `
Examples:
  $ ${this.toolName} ${this.commandName} $[0] -j '${sampleString}'
  $ echo -n '${sampleString}' | ${this.toolName} ${this.commandName} $[2]
  $ ${this.toolName} ${this.commandName} $.one -j '${object}'
  $ echo -n '${object}' | ${this.toolName} ${this.commandName} -s $.array 
  `;
    Logger.console(message);
  }
}
