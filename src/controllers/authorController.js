const renderAuthor = async (req, res) => {
  res.send('Author Page');
};

const renderSpecificAuthor = async (req, res) => {
  res.send(`Author id ${req.params.id}`);
};

module.exports = { renderAuthor, renderSpecificAuthor };
