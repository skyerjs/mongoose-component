'use strict';

class MongooseComponent extends Skyer.Component {
  constructor( options ) {
    super(options);

    this.connection = null;
  }

  _defaultOptions() {
    return {
      config_key: 'mongoose',
      connection: {
        url: 'mongodb://127.0.0.1:27017/test',
        options: {}
      }
    };
  }

  _getConfig() {
    const confKey = this.options.config_key;
    const connection = this.skyer.config.get(confKey) || {};

    return Skyer._.extend(this.options.connection, connection);
  }

  _build() {
    super._build();

    const mongoose = require('mongoose');
    this.connection = mongoose.createConnection(this.config.url, this.config.options);

    return this.connection;
 }

  shutdown(){
    super.shutdown();

    if( this.connection ){
      this.connection.close && this.connection.close();
    }
  }
}

module.exports = MongooseComponent;