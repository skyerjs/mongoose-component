'use strict';

const debug = require('debug')('skyer:components:mongoose');

class MongooseComponent extends Skyer.Component {
  constructor( options ) {
    super(options);

    this.connection = null;
    this.mongoose   = null;

    this.models = {};
  }

  _defaultOptions() {
    return {
      config_key: 'mongoose',
      connection: {
        url: 'mongodb://127.0.0.1:27017/test',
        model_path: this.skyer.options.model_path + '/mongoose',
        options: {}
      }
    };
  }

  _getConfig() {
    const confKey    = this.options.config_key;
    const connection = this.skyer.config.get(confKey) || {};

    return Skyer._.extend(this.options.connection, connection);
  }

  _build() {
    super._build();

    const mongoose   = require('mongoose');
    mongoose.Promise = global.Promise;
    this.mongoose    = mongoose;

    this.connection = mongoose.createConnection(this.config.url, this.config.options);

    this._bindEvents();
    this._loadModels();

    return this.connection;
  }

  _bindEvents() {
    const events = [
      'connecting',
      'open',
      'disconnecting',
      'disconnected',
      'close',
      'reconnected',
      'error',
      'fullsetup',
      'all',
    ];

    events.forEach(event => {
      this.connection.on(event, () => {
        debug('connection listen event %s with arguments: %j', event, arguments);

        this.emit(evnet, arguments);
      });
    });
  }

// load mongoose models
  _loadModels() {
    const modelPath = this.config.model_path;

    // todo: /**/*.model.js ?
    const pattern = `${modelPath}/**/*.js`;
    const files   = Skyer.glob.sync(pattern);

    files.forEach(file => {
      const modelFactory = require(file);

      if ( modelFactory && typeof modelFactory === 'function' ) {
        const model = modelFactory.call(this, this.mongoose, this.connection);

        this.models[model.modelName] = model;
      } else {
        debug('invalid model file, because module exports is invalid model factory function');
      }
    });
  }

  shutdown() {
    super.shutdown();

    if ( this.connection ) {
      this.connection.close && this.connection.close();
    }
  }
}

module.exports = MongooseComponent;