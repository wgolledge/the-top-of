const { availableSources } = require('./supportedSourceList');

const getSourceImage = (req, res) => {
  const imageId = Number(req.params.id);
  const { imgName } = availableSources.find(source => source.id === imageId);

  res.sendFile(`${__dirname}/supportedSources/images/${imgName}`);
};

module.exports = {
  getSourceImage,
};
