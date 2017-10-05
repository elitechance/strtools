# strtools

## Install

### Local install

```bash

npm install strtools

```

### Global install

```bash

npm install -g strtools

```

## Base64 encode/decode

### Base64 tools usage

```bash

strtools base64enc <string>
strtools base64dec <string>

```

## URL encode/decode

### URL tools usage

```bash

strtools urlenc <string>
strtools urldec <string>

```

## Generate uuid1 and uuid4

### Generate tools usage

```bash

strtools generate uuid1
strtools generate uuid4

```

## Bcrypt

### Bcrypt tools usage

```bash

strtools bcrypt-encode <raw-password> [salt-rounds]
strtools bcrypt-hash <raw-password> <salt>
strtools bcrypt-salt <salt-rounds>
strtools bcrypt-match <raw-password> <hash>

```