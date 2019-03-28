const app = require('express')();
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('... the top of')
});

app.listen(8080, () => {
  console.log('App listening on port 8080!')
});