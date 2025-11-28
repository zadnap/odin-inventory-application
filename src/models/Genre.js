const BaseModel = require('./BaseModel');

class Genre extends BaseModel {
  constructor() {
    super('genres', 'genreID');
  }
}

module.exports = new Genre();
