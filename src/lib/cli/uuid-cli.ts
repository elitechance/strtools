import { CliBase } from './cli-base';
import { Logger } from '../../helpers/logger';
import { Uuid } from '../uuid';

export class UuidCli extends CliBase {
  protected commandName = 'uuid';
  constructor() {
    super();
    this.handler
      .command(`${this.commandName}`)
      .option('-1, --version1', 'Generate UUID Version 1')
      .option('-4, --version4', 'Generate UUID Version 2')
      .option('-5, --version5', 'Generate UUID Version 2')
      .option('-n, --namespace <string>', 'UUID Version 5 namespace')
      .option('-v, --value <string>', 'UUID Version 5 value')
      .option('-o, --offset <number>', 'UUID Version 5 offset number')
      .on('--help', this.help.bind(this))
      .action(this.processCommand.bind(this));
  }

  protected async processCommand(options: any) {
    this.options = options;
    try {
      if (this.options.version1) {
        Logger.console(await Uuid.v1());
      } else if (this.options.version4) {
        Logger.console(await Uuid.v4());
      } else if (this.options.version5) {
        await this.doUuid5();
      } else {
        Logger.console(await Uuid.v1());
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

  private async doUuid5() {
    if (this.options.namespace) {
      let value = '';
      if (this.options.value) {
        value = this.options.value;
      } else {
        value = this.getFromStdin();
      }
      const uuid5 = await Uuid.v5(value, this.options.namespace);
      Logger.console(uuid5);
    } else {
      Logger.error(`Missing --namespace`);
    }
  }

  private help() {
    const message = `
Commands:
  Examples:
    # Generate default uuid (version 1)
    $ ${this.toolName} ${this.commandName}'

    $ ${this.toolName} ${this.commandName} --version1'

    # Generate uuid version 4
    $ ${this.toolName} ${this.commandName} -4'

    # Generate uuid version 5
    $ ${this.toolName} ${this.commandName} -5 --namespace dns -v 'google.com'

    # Generate uuid version 5 from stdin
    $ echo -n 'google.com' | ${this.toolName} ${this.commandName} -5 -n dns
    `;
    Logger.console(message);
  }
}
