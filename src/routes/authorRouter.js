const { Router } = require('express');

const authorRouter = Router();

authorRouter.get('/', (req, res) => res.send('Author Page'));
authorRouter.get('/:id', (req, res) => res.send(`Author id ${req.params.id}`));

module.exports = authorRouter;
