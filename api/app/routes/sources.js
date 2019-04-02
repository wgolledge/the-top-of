// eslint-disable-next-line no-multi-assign
const app = (module.exports = require('express')());
const { getSources, getSourceData } = require('../actions/sources');

app.get('/', (req, res) => {
  getSources(req, res);
});

app.get('/:id', (req, res) => {
  getSourceData(req, res);
});
