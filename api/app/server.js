require('./dotenv');
const app = require('express')();
const cors = require('cors');

const routes = require('./routes');

app.use(cors());
app.options('*', cors());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
