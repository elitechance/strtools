import { CliBase } from './cli-base';
import { Logger } from '../../helpers/logger';
import { Base64 } from '../base64';

const COMMANDS = {
  ENCODE: 'encode',
  ENC: 'enc',
  DECODE: 'decode',
  DEC: 'dec',
};

export class Base64Cli extends CliBase {
  protected commandName = 'base64';
  constructor() {
    super();
    this.handler
      .command(`${this.commandName} <command>`)
      .option('-i, --input <string>', 'Input string')
      .on('--help', this.help.bind(this))
      .action(this.processCommand.bind(this));
  }

  protected async processCommand(command: string, options: any) {
    try {
      this.options = options;
      switch (command) {
        case COMMANDS.ENC:
        case COMMANDS.ENCODE:
          await this.doEncode();
          break;
        case COMMANDS.DEC:
        case COMMANDS.DEC:
          await this.doDecode();
          break;
        default:
          await this.help();
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

  private async doEncode() {
    let input = this.options.input;
    if (input) {
      Logger.console(await Base64.encode(input));
    } else {
      input = this.getFromStdin();
      Logger.console(await Base64.encode(input));
    }
  }

  private async doDecode() {
    let input = this.options.input;
    if (input) {
      Logger.console(await Base64.decode(input));
    } else {
      input = this.getFromStdin();
      Logger.console(await Base64.decode(input));
    }
  }

  private help() {
    const sampleString = `Hello World`;
    const message = `
Commands:
  ${COMMANDS.ENCODE}|${COMMANDS.ENC}: Encode string
  ${COMMANDS.DECODE}|${COMMANDS.DEC}: Decode string

  Examples:
    $ ${this.toolName} ${this.commandName} enc -i '${sampleString}'
    $ echo -n '${sampleString}' | ${this.toolName} ${this.commandName} encode
    `;
    Logger.console(message);
  }
}
