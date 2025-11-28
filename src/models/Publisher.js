const BaseModel = require('./BaseModel');

class Publisher extends BaseModel {
  constructor() {
    super('publishers', 'publisherID');
  }
}

module.exports = new Publisher();
