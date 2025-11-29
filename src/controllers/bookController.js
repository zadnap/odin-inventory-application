const renderBook = async (req, res) => {
  res.send('Book Page');
};

const renderSpecificBook = async (req, res) => {
  res.send(`Book id ${req.params.id}`);
};

module.exports = { renderBook, renderSpecificBook };
