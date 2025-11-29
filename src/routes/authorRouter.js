const { Router } = require('express');
const {
  renderAuthor,
  renderSpecificAuthor,
} = require('../controllers/authorController');

const authorRouter = Router();

authorRouter.get('/', renderAuthor);
authorRouter.get('/:id', renderSpecificAuthor);

module.exports = authorRouter;
