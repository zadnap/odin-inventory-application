const renderPublisher = async (req, res) => {
  res.send('Publisher Page');
};

const renderSpecificPublisher = async (req, res) => {
  res.send(`Publisher id ${req.params.id}`);
};

module.exports = { renderPublisher, renderSpecificPublisher };
