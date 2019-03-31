// eslint-disable-next-line no-multi-assign
const app = (module.exports = require('express')());

const mockSources = require('./mockSources.json');
const mockSourcesData = require('./mockSourcesData.json');

app.get('/', (req, res) => {
  res.send(mockSources);
});

app.get('/:id', (req, res) => {
  res.send(mockSourcesData.find(data => data.id === Number(req.params.id)));
});
