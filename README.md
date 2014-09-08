# HTTP DB Client

This is a client for [http-db](https://github.com/JerrySievert/http-db).

## Install

```
$ npm install --save http-db-client
```

## Usage

```js
var Client = require('http-db-client');

var db = new Client('http://localhost:8765', token);
```

See [Documentation](doc/index.md) for full usage information.
