const { Router } = require('express');
const {
  renderBook,
  renderSpecificBook,
} = require('../controllers/bookController');

const bookRouter = Router();

bookRouter.get('/', renderBook);
bookRouter.get('/:id', renderSpecificBook);

module.exports = bookRouter;
