const dotenv = require('dotenv');
const express = require('express');
const indexRouter = require('./routes/indexRouter');
const bookRouter = require('./routes/bookRouter');
const authorRouter = require('./routes/authorRouter');
const publisherRouter = require('./routes/publisherRouter');

dotenv.config();

const app = express();
const PORT = process.env.EXPRESS_PORT;

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/publishers', publisherRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app is listening on port ${PORT}!`);
});
