const glob = require('glob');
const path = require('path');
const storage = require('node-persist');
const schedule = require('node-schedule');

storage.init();

const sources = glob.sync(`${__dirname}/supportedSources/*.js`).map(file =>
  // eslint-disable-next-line
  require(path.resolve(file))
);

const availableSources = (() => {
  let id = 0;

  return sources
    .filter(source => source.working)
    .map(source => ({
      // eslint-disable-next-line no-plusplus
      id: ++id,
      ...source,
    }));
})();

const updateSourceStorage = async () => {
  console.log('updating sourceStorage');

  try {
    const sourceDataArr = await Promise.all(
      availableSources.map(source => source.getData()),
    );

    await availableSources.forEach((source, i) => {
      storage.setItem(source.id.toString(), sourceDataArr[i]);
    });
  } catch (err) {
    console.log(err);
  }
};

updateSourceStorage();

// update sourceData every two hours
schedule.scheduleJob('0 */2 * * *', () => {
  updateSourceStorage();
});

module.exports = {
  availableSources,
};
