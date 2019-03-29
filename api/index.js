const app = require('express')();

app.get('/', (req, res) => {
  res.send('... the top of')
});

app.listen(8080, () => {
  console.log('App listening on port 8080!')
});