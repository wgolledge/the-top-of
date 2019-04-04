const supportedSources = require('./supportedSourceList');

const getSourceImage = (req, res) => {
  const imageId = Number(req.params.id);
  const { imgName } = supportedSources.find(source => source.id === imageId);

  res.sendFile(`${__dirname}/supportedSources/images/${imgName}`);
};

module.exports = {
  getSourceImage,
};
