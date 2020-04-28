# jp (JSON Path)

```bash
Usage: strtools jp [options] <path>

Options:
  -j, --json <string>  JSON string
  -s, --stringify      Stringify output
  -h, --help           display help for command

Examples:
  $ strtools jp $[0] -j '[1,2,3,4]'
  $ echo -n '[1,2,3,4]' | strtools jp $[2]
  $ strtools jp $.one -j '{"one":1,"two":2,"array":[1,2,3,4]}'
  $ echo -n '{"one":1,"two":2,"array":[1,2,3,4]}' | strtools jp -s $.array
```
