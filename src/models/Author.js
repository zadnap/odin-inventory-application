const BaseModel = require('./BaseModel');

class Author extends BaseModel {
  constructor() {
    super('authors', 'authorID');
  }
}

module.exports = new Author();
