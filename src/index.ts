#!/usr/bin/env node
import * as base64 from 'base-64';
import * as commander from 'commander';
import * as uuidv1 from 'uuid/v1';
import * as uuidv4 from 'uuid/v4';

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

    private initCommander() {
        commander.version('1.0.0');
        commander.command('base64enc <string>').action(this.base64Encode);
        commander.command('base64dec <string>').action(this.base64Decode);
        commander.command('urlenc <string>').action(this.urlEncode);
        commander.command('urldec <string>').action(this.urlDecode);
        commander.command('generate <uuid1|uuid4>').action(this.generate);
        commander.parse(process.argv);
    }
}

const stringTools = new StringTools();