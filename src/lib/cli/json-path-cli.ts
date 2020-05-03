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
      .option('-c, --color <boolean>', 'Default to true')
      .option('-o, --compact <value>', 'Default to false')
      .on('--help', this.help.bind(this))
      .action(this.processCommand.bind(this));
  }

  protected async processCommand(path: string, options: any) {
    this.options = options;
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
        Logger.deep(value[0], this.getOptions());
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

  private getOptions() {
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

  private help() {
    const sampleString = `[1,2,3,4]`;
    const object = JSON.stringify({ one: 1, two: 2, array: [1, 2, 3, 4] });
    const message = `
Examples:
  $ ${this.toolName} ${this.commandName} $[0] -j '${sampleString}'
  $ ${this.toolName} ${this.commandName} $[0] -j '${sampleString}' --color false
  $ echo -n '${sampleString}' | ${this.toolName} ${this.commandName} $[2]
  $ ${this.toolName} ${this.commandName} $.one -j '${object}'
  $ echo -n '${object}' | ${this.toolName} ${this.commandName} -s $.array 
  $ echo -n '${object}' | ${this.toolName} ${this.commandName} $.array 
  $ echo -n '${object}' | ${this.toolName} ${this.commandName} $.array --compact true
  `;
    Logger.console(message);
  }
}
