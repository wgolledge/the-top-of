const app = require('express')();
const dotenv = require('dotenv');

dotenv.config();

const routes = require('./routes');

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
