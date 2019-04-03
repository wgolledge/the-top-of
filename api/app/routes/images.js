// eslint-disable-next-line no-multi-assign
const app = (module.exports = require('express')());
const { getSourceImage } = require('../actions/images');

app.get('/:id', (req, res) => {
  getSourceImage(req, res);
});
