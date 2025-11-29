const { Router } = require('express');
const {
  renderPublisher,
  renderSpecificPublisher,
} = require('../controllers/publisherController');

const publisherRouter = Router();

publisherRouter.get('/', renderPublisher);
publisherRouter.get('/:id', renderSpecificPublisher);

module.exports = publisherRouter;
