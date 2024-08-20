const express = require('express');
const bodyParser = require('body-parser');
const clientesRouter = require('./clientes');
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use('/clientes', clientesRouter);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;