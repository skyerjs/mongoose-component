# skyer-mongoose-component

[![npm version](https://badge.fury.io/js/skyer-mongoose-component.svg)](https://badge.fury.io/js/skyer-mongoose-component)

> Skyer mongoose component.

## Install

[![NPM](https://nodei.co/npm/skyer-mongoose-component.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/skyer-mongoose-component/)

```bash
$ npm i --save skyer-mongoose-component
```

## Register

/app/components/mongoose.component.js

```js
module.exports = require('skyer-mongoose-component');
```

## Usage

```js
const mongooseClient = skyer.componentManager.getComponent('mongooseClient');


```

## Options

See `mongoose` [connection options](http://mongoosejs.com/docs/connections.html)
and [Mongoose-createConnection](http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection)

## Example

See [skyer-example](https://github.com/skyerjs/skyer-example)

## Licences

[MIT](LICENSE)