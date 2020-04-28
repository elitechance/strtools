import { CliBase } from './cli-base';
import { Logger } from '../../helpers/logger';
import { Bcrypt } from '../../lib/bcrypt';

const COMMANDS = {
  HASH: 'hash',
  MATCH: 'match',
  SALT: 'salt',
};

export class BcryptCli extends CliBase {
  protected commandName = 'bcrypt';
  constructor() {
    super();
    this.handler
      .command(`${this.commandName} <command>`)
      .option('-p, --password <string>', 'Password to encrypt')
      .option('-h, --hashed <string>', 'Hashed string value')
      .option('-r, --rounds <number>', 'Rounds value, default 10')
      .on('--help', this.help.bind(this))
      .action(this.processCommand.bind(this));
  }

  protected async processCommand(command: string, options: any) {
    try {
      this.options = options;
      switch (command) {
        case COMMANDS.HASH:
          await this.doHash();
          break;
        case COMMANDS.MATCH:
          await this.doMatch();
          break;
        case COMMANDS.SALT:
          await this.doSalt();
          break;
        default:
          await this.help();
      }
    } catch (error) {
      if (error.message) {
        Logger.console(error.message);
      } else {
        Logger.console(error);
      }
      process.exit(1);
    }
  }

  private async doHash() {
    let password = this.options.password;
    if (!password) {
      password = this.getFromStdin();
    }
    let rounds = 10;
    if (this.options.rounds) {
      rounds = parseInt(this.options.rounds);
    }
    const encrypted = await Bcrypt.hash(password, rounds);
    Logger.console(encrypted);
  }

  private async doMatch() {
    const hashed = this.options.hashed;
    if (!hashed) {
      Logger.error(`Missing --hashed or -h`);
      process.exit(1);
    }
    let password = this.options.password;
    if (!password) {
      password = this.getFromStdin();
    }
    const match = await Bcrypt.match(password, hashed);
    Logger.console(match);
  }

  private async doSalt() {
    let rounds = parseInt(this.options.rounds);
    if (!rounds) {
      rounds = 10;
    }
    const value = await Bcrypt.salt(rounds);
    Logger.console(value);
  }

  private help() {
    const sampleString = `MySecret${new Date().getTime()}`;
    const secrets = 'S3cR3ts';
    const hashed =
      '$2b$10$KCftl.A7uUSBkWgNY69/De3E9Pw0jJ0/x14qd9H1gjbP1CtmPfGsG';
    const message = `
Commands:
  ${COMMANDS.HASH}: Hash password
  ${COMMANDS.MATCH}: Match password

  Examples:
    $ ${this.toolName} ${this.commandName} ${COMMANDS.HASH} -p '${sampleString}'
    $ echo -n '${sampleString}' | ${this.toolName} ${this.commandName} ${COMMANDS.HASH}
    $ ${this.toolName} ${this.commandName} ${COMMANDS.MATCH} -p ${secrets} --hashed '${hashed}'
    $ echo -n '${secrets}' | ${this.toolName} ${this.commandName} ${COMMANDS.MATCH} -h '${hashed}'
    $ ${this.toolName} ${this.commandName} ${COMMANDS.SALT}
    $ ${this.toolName} ${this.commandName} ${COMMANDS.SALT} --rounds 15
    `;
    Logger.console(message);
  }
}
