const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app is listening on port ${PORT}!`);
});
