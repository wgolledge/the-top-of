const storage = require('node-persist');
const { availableSources } = require('./supportedSourceList');

const { returnPropIfExists } = require('../util/obj');

const getSources = (req, res) => {
  try {
    const formattedSources = availableSources.map(source => ({
      id: source.id,
      name: source.name,
      url: source.url,
      ...returnPropIfExists(source.attributionLink, 'attributionLink'),
    }));

    res.send({ data: formattedSources });
  } catch (err) {
    console.log(err);
    res.send({ error: err });
  }
};

const getSourceData = async (req, res) => {
  try {
    const sourceData = await storage.getItem(req.params.id);

    res.send({
      data: sourceData,
    });
  } catch (err) {
    console.log(err);
    res.send({ error: err });
  }
};

module.exports = {
  getSources,
  getSourceData,
};
