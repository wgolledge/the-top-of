// eslint-disable-next-line no-multi-assign
const app = module.exports = require('express')();

app.get('/', (req, res) => {
  res.send('... the top of');
});
