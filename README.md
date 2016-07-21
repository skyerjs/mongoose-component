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
const mongoose = require('mongoose');

const mongooseConn = skyer.componentManager.getComponent('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

const Blog = mongooseConn.model('Blog', blogSchema);

const blog = yield Blog.create({
  title: 'test',
  author: 'jerrywu',
  body: 'hello skyer'
});
```

Or

> Build skyer-mongoose-component with model_path options.

```js
const mongooseConn = skyer.componentManager.getComponent('mongoose');

const UserLoginLogModel = mongooseConn.model('UserLoginLog');

const log = yield UserLoginLogModel.create({
  user_id: 1000,
  type: 'login',
  ip: '192.168.1.100'
  ua: 'xxx'
});
```

## Events

See `mongoose` [connection events](http://mongoosejs.com/docs/api.html#connection_Connection)

> If you want to listen mongoose connection events , you can inherits MongooseComponent then do your listen logic.

/app/components/mongoose.component.js
```js
const MongooseComponent = require('skyer-mongoose-component');

class YourMongooseComponent extends MongooseComponent {
  constructor(options){
    super(options);

    this._addEventListens();
  }

  _addEventListens(){
    this.on('error', (err) => {
      console.error(err);
    });

    this.on('open', () => {
      console.log('mongoose connection already open!');
    });
  }
}

module.exports = YourMongooseComponent;
```

## Options

See `mongoose` [connection options](http://mongoosejs.com/docs/connections.html)
and [Mongoose-createConnection](http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection)

## Example

See [skyer-example](https://github.com/skyerjs/skyer-example)

## Licences

[MIT](LICENSE)