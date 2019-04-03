// eslint-disable-next-line global-require
const sources = [require('./hackerNews'), require('./bbc')];

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
