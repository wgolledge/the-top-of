const storage = require('node-persist');
const { availableSources } = require('./supportedSourceList');

const returnPropIfExists = (prop, name) => prop && { [name]: prop };

const getSources = (req, res) => {
  try {
    const formattedSources = availableSources.map(source => ({
      id: source.id,
      name: source.name,
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
