# uuid

```bash
Usage: str jwt [options] <command>

Options:
  -s --secret <string>   JWT Secret
  -t --token <string>    JWT Token
  -p --payload <string>  JWT Payload
  -i --iat <number>      JWT IAT Value
  -e --exp <number>      JWT EXP Value
  -t --exp-ttl <number>  JWT EXP TTL in Seconds
  -j --jti <number>      JWT JTI Value
  -c, --color <boolean>  Default to true
  -o, --compact <value>  Default to false
  -r, --stringify        Stringify decoded output
  -h, --help             display help for command

Commands:
  Examples:
    # Generate generic token
    $ strtools jwt sign --secret My1234Secret

    # Generate token with 30 seconds expiration
    $ strtools jwt sign --secret My1234Secret --exp-ttl 30

    # Generate token custom payload
    $ strtools jwt sign --secret My1234Secret --payload '{"hello":"world"}'

    # Decode token (no verification)
    $ strtools jwt decode --token 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMTMyODdkMC1hYTY5LTRhNmQtOGE0MS0wYjIzMGQwYzZmMTIiLCJpYXQiOjE1OTAwMjgwODJ9.6O-3eaTB1xK6M7kixdKB32TxDHY2HKslvy5LBFiQRns'

    # Decode token from stdin
    $ strtools jwt sign --secret My1234Secret | strtools jwt decode

    # Verify
    $ strtools jwt verify --secret My1234Secret--token 'tokenvalue'

    # Verify using secret from stdin
    $ echo -n 'My1234Secret' | strtools jwt verify --token 'tokenvalue'

```
