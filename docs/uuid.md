# uuid

```bash
Usage: strtools uuid [options]

Options:
  -1, --version1            Generate UUID Version 1
  -4, --version4            Generate UUID Version 2
  -5, --version5            Generate UUID Version 2
  -n, --namespace <string>  UUID Version 5 namespace
  -v, --value <string>      UUID Version 5 value
  -o, --offset <number>     UUID Version 5 offset number
  -h, --help                display help for command

Commands:
  Examples:
    # Generate default uuid (version 1)
    $ strtools uuid'

    $ strtools uuid --version1'

    # Generate uuid version 4
    $ strtools uuid -4'

    # Generate uuid version 5
    $ strtools uuid -5 --namespace dns -v 'google.com'

    # Generate uuid version 5 from stdin
    $ echo -n 'google.com' | strtools uuid -5 -n dns
```
