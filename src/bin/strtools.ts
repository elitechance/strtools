#!/usr/bin/env node
import * as commander from 'commander';
import { Base64Cli } from '../lib/cli/base64-cli';
import { CliBase } from '../lib/cli/cli-base';
import { UrlCli } from '../lib/cli/url-cli';
import { UuidCli } from '../lib/cli/uuid-cli';
import { Logger } from '../helpers/logger';
import { BcryptCli } from '../lib/cli/bcrypt-cli';
import { JsonPathCli } from '../lib/cli/json-path-cli';
import { JwtCli } from '../lib/cli/jwt-cli';

class StringTools extends CliBase {
  constructor() {
    super();
    new Base64Cli();
    new UrlCli();
    new UuidCli();
    new BcryptCli();
    new JsonPathCli();
    new JwtCli();
    this.initCommander();
  }

  private initCommander() {
    commander.version(this.getVersion());
    commander.on('command:*', this.help.bind(this));
    commander.parse(process.argv);
  }

  private getVersion() {
    const path = `${__dirname}/../package.json`;
    const packageJson = require(path);
    const version = packageJson.version;
    return version;
  }

  private help() {
    let currentCmd = process.argv[2];
    if (!currentCmd) {
      currentCmd = '';
    }
    Logger.console(`Unknown command "${currentCmd}"`);
    Logger.console(`Usage: ${this.toolName} --help`);
    process.exit(1);
  }
}

new StringTools();
