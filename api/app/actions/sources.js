const supportedSources = require('./supportedSourceList');

const returnPropIfExists = (prop, name) => prop && { [name]: prop };

const getSources = (req, res) =>
  res.send(
    supportedSources.reduce((acc, curr) => {
      if (!curr.working) {
        return acc;
      }

      acc.push({ id: curr.id, name: curr.name });

      return acc;
    }, []),
  );

const getSourceData = (req, res) => {
  const { getData, attributionLink } = supportedSources.find(
    source => source.id === Number(req.params.id),
  );

  return getData()
    .then(data =>
      res.send({
        data,
        ...returnPropIfExists(attributionLink, 'attributionLink'),
      }),
    )
    .catch(err => console.log(err));
};

module.exports = {
  getSources,
  getSourceData,
};
