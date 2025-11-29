const { Router } = require('express');

const publisherRouter = Router();

publisherRouter.get('/', (req, res) => res.send('Publisher Page'));
publisherRouter.get('/:id', (req, res) =>
  res.send(`Publisher id ${req.params.id}`)
);

module.exports = publisherRouter;
