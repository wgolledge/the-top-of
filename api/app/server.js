const app = require('express')();
const dotenv = require('dotenv');

dotenv.config();

const routes = require('./routes');

app.use(routes);

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
