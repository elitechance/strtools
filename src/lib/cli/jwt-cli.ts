import * as moment from 'moment';
import { CliBase } from './cli-base';
import { Logger } from '../../helpers/logger';
import { Jwt } from '../jwt';

const COMMANDS = {
  SIGN: 'sign',
  VERIFY: 'verify',
  DECODE: 'decode',
};

export class JwtCli extends CliBase {
  protected commandName = 'jwt';
  protected jwt = new Jwt();
  constructor() {
    super();
    this.handler
      .command(`${this.commandName} <command>`)
      .option('-s --secret <string>', 'JWT Secret')
      .option('-t --token <string>', 'JWT Token')
      .option('-p --payload <string>', 'JWT Payload')
      .option('-i --iat <number>', 'JWT IAT Value')
      .option('-e --exp <number>', 'JWT EXP Value')
      .option('-t --exp-ttl <number>', 'JWT EXP TTL in Seconds')
      .option('-j --jti <number>', 'JWT JTI Value')
      .option('-c, --color <boolean>', 'Default to true')
      .option('-o, --compact <value>', 'Default to false')
      .option('-r, --stringify', 'Stringify decoded output')
      .on('--help', this.help.bind(this))
      .action(this.processCommand.bind(this));
  }

  protected async processCommand(command: string, options: any) {
    this.options = options;
    try {
      switch (command) {
        case COMMANDS.SIGN:
          await this.doSign(this.getSecret());
          break;
        case COMMANDS.VERIFY:
          await this.doVerify(this.options.token, this.getSecret());
          break;
        case COMMANDS.DECODE:
          await this.doDecode(this.getToken());
          break;
        default:
          Logger.console(`Unknown command: ${command}`);
          this.help();
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

  private getSecret() {
    if (this.options.secret) {
      return this.options.secret;
    } else {
      return this.getFromStdin();
    }
  }

  private getToken() {
    if (this.options.token) {
      return this.options.token;
    } else {
      return this.getFromStdin();
    }
  }

  private async doSign(secret) {
    try {
      const options = this.getOptions();
      const token = await this.jwt.generate(secret, options);
      Logger.console(token);
    } catch (error) {
      if (error instanceof SyntaxError) {
        Logger.console(`Invalid Payload`);
        process.exit(1);
      }
    }
  }

  private async doVerify(token, secret) {
    try {
      await this.jwt.verify(token, secret);
      Logger.console('Success');
    } catch (error) {
      Logger.console('Failed:', error.message);
    }
  }

  private async doDecode(token) {
    const payload = await this.jwt.decode(token);
    if (this.options.stringify) {
      Logger.console(JSON.stringify(payload));
    } else {
      Logger.deep(payload, this.getPrintOptions());
    }
  }

  private getOptions() {
    let payload: any = {};
    let dirty = false;
    if (this.options.payload) {
      payload = { ...JSON.parse(this.options.payload) };
      dirty = true;
    }
    if (this.options.jti) {
      payload.jti = this.options.jti;
      dirty = true;
    }
    if (this.options.expTtl) {
      const seconds = parseInt(this.options.expTtl);
      payload.exp = moment.utc().add(seconds, 'seconds').unix();
      dirty = true;
    }
    const properties = ['iat', 'exp'];
    for (const property of properties) {
      if (this.options[property]) {
        dirty = true;
        payload[property] = parseInt(this.options[property]);
      }
    }
    if (dirty) {
      return payload;
    }
  }

  private help() {
    const sampleToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMTMyODdkMC1hYTY5LTRhNmQtOGE0MS0wYjIzMGQwYzZmMTIiLCJpYXQiOjE1OTAwMjgwODJ9.6O-3eaTB1xK6M7kixdKB32TxDHY2HKslvy5LBFiQRns`;
    const sampleSecret = `My1234Secret`;
    const message = `
Commands:
  Examples:
    # Generate generic token
    $ ${this.toolName} ${this.commandName} sign --secret ${sampleSecret}

    # Generate token with 30 seconds expiration
    $ ${this.toolName} ${this.commandName} sign --secret ${sampleSecret} --exp-ttl 30

    # Generate token custom payload
    $ ${this.toolName} ${this.commandName} sign --secret ${sampleSecret} --payload '{"hello":"world"}'

    # Decode token (no verification)
    $ ${this.toolName} ${this.commandName} decode --token '${sampleToken}'

    # Decode token from stdin
    $ ${this.toolName} ${this.commandName} sign --secret ${sampleSecret} | ${this.toolName} ${this.commandName} decode

    # Verify
    $ ${this.toolName} ${this.commandName} verify --secret ${sampleSecret}--token 'tokenvalue'

    # Verify using secret from stdin
    $ echo -n '${sampleSecret}' | ${this.toolName} ${this.commandName} verify --token 'tokenvalue'
    `;
    Logger.console(message);
  }
}
