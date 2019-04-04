const glob = require('glob');
const path = require('path');

const sources = glob.sync(`${__dirname}/supportedSources/*.js`).map(file =>
  // eslint-disable-next-line
  require(path.resolve(file))
);

let id = 0;

module.exports = sources.map(source => ({
  // eslint-disable-next-line no-plusplus
  id: ++id,
  name: source.name,
  working: source.working,
  imgName: source.imgName,
  getData: source.getData,
  attributionLink: source.attributionLink,
}));
