#!/usr/bin/env node
import * as base64 from 'base-64';
import * as commander from 'commander';
import * as uuidv1 from 'uuid/v1';
import * as uuidv4 from 'uuid/v4';
import * as bcrypt from 'bcrypt';

class StringTools {

    constructor() {
        this.initCommander();
    }

    private base64Encode(str: string) {
        console.log(base64.encode(str));
    }

    private base64Decode(str: string) {
        console.log(base64.decode(str));
    }

    private urlEncode(str: string) {
        console.log(encodeURIComponent(str));
    }

    private urlDecode(str: string) {
        console.log(decodeURIComponent(str));
    }

    private generate(option: string) {
        switch(option) {
            case 'uuid1': console.log(uuidv1()); break;
            case 'uuid4': console.log(uuidv4()); break;
        }
    }

    private bcryptEncode(rawPassword: string, saltRounds?: string) {
        let intSaltRounds = 10;
        if (saltRounds) { intSaltRounds = parseInt(saltRounds, 10); }
        bcrypt.hash(rawPassword, intSaltRounds, (error, hash) => {
            if (error) {
                console.log(error);
            } else {
                console.log(hash);
            }
        });
    }

    private bcryptHash(rawPassword: string, salt: string) {
        bcrypt.hash(rawPassword, salt, (error, hash) => {
            if (error) {
                console.log(error);
            } else {
                console.log(hash);
            }
        });
    }

    private bcryptSalt(saltRounds: string) {
        const intSaltRounds = parseInt(saltRounds, 10);
        bcrypt.genSalt(intSaltRounds, (error, salt) => {
            if (error) {
                console.log(error);
            } else {
                console.log(salt);
            }
        });
    }

    private bcryptMatch(rawPassword: string, hash: string) {
        bcrypt.compare(rawPassword, hash, (error, response) => {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
            }
        });
    }

    private initCommander() {
        commander.version('1.0.0');
        commander.command('base64enc <string>').action(this.base64Encode);
        commander.command('base64dec <string>').action(this.base64Decode);
        commander.command('urlenc <string>').action(this.urlEncode);
        commander.command('urldec <string>').action(this.urlDecode);
        commander.command('generate <uuid1|uuid4>').action(this.generate);
        commander.command('bcrypt-encode <raw-password> [salt-rounds]')
            .action((...args: any[]) => { this.bcryptEncode(args[0], args[1]) } );
        commander.command('bcrypt-hash <raw-password> <salt>')
            .action((...args: any[]) => { this.bcryptHash(args[0], args[1]) } );
        commander.command('bcrypt-salt <salt-rounds>')
            .action((...args: any[]) => { this.bcryptSalt(args[0]) } );
        commander.command('bcrypt-match <raw-password> <hash>')
            .action((...args: any[]) => { this.bcryptMatch(args[0], args[1]) } );
        commander.parse(process.argv);
    }
}

const stringTools = new StringTools();