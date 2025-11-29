const { Router } = require('express');

const bookRouter = Router();

bookRouter.get('/', (req, res) => res.send('Book Page'));
bookRouter.get('/:id', (req, res) => res.send(`Book id ${req.params.id}`));

module.exports = bookRouter;
