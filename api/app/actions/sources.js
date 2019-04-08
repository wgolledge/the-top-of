const storage = require('node-persist');
const { availableSources } = require('./supportedSourceList');

const returnPropIfExists = (prop, name) => prop && { [name]: prop };

const getSources = (req, res) =>
  res.send(
    availableSources.map(source => ({ id: source.id, name: source.name })),
  );

const getSourceData = async (req, res) => {
  const selectedSource = availableSources.find(
    source => source.id === Number(req.params.id),
  );

  try {
    const data = await storage.getItem(req.params.id);

    res.send({
      data,
      ...returnPropIfExists(selectedSource.attributionLink, 'attributionLink'),
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getSources,
  getSourceData,
};
