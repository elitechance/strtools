# bcrypt

```bash
Usage: strtools bcrypt [options] <command>

Options:
  -p, --password <string>  Password to encrypt
  -h, --hashed <string>    Hashed string value
  -r, --rounds <number>    Rounds value, default 10
  --help                   display help for command

Commands:
  hash: Hash password
  match: Match password

  Examples:
    $ strtools bcrypt hash -p 'MySecret1588042664426'
    $ echo -n 'MySecret1588042664426' | strtools bcrypt hash
    $ strtools bcrypt match -p S3cR3ts --hashed '$2b$10$KCftl.A7uUSBkWgNY69/De3E9Pw0jJ0/x14qd9H1gjbP1CtmPfGsG'
    $ echo -n 'S3cR3ts' | strtools bcrypt match -h '$2b$10$KCftl.A7uUSBkWgNY69/De3E9Pw0jJ0/x14qd9H1gjbP1CtmPfGsG'
    $ strtools bcrypt salt
    $ strtools bcrypt salt --rounds 15
```
