const BaseModel = require('./BaseModel');

class Book extends BaseModel {
  constructor() {
    super('books', 'bookID');
  }
}

module.exports = new Book();
