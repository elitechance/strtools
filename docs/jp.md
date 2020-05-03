# jp (JSON Path)

```bash
Usage: strtools jp [options] <path>

Options:
  -j, --json <string>  JSON string
  -s, --stringify      Stringify output
  -c, --color <boolean>  Default to true
  -o, --compact <value>  Default to false
  -h, --help           display help for command

Examples:
  $ strtools jp $[0] -j '[1,2,3,4]'
  $ strtools jp $[0] -j '[1,2,3,4] --color false'
  $ echo -n '[1,2,3,4]' | strtools jp $[2]
  $ strtools jp $.one -j '{"one":1,"two":2,"array":[1,2,3,4]}'
  $ echo -n '{"one":1,"two":2,"array":[1,2,3,4]}' | strtools jp -s $.array
  $ echo -n '{"one":1,"two":2,"array":[1,2,3,4]}' | strtools jp $.array
  $ echo -n '{"one":1,"two":2,"array":[1,2,3,4]}' | strtools jp $.array --compact true
```
