const express = require('express');
const bodyParser = require('body-parser');
const clientesRouter = require('./clientes');

const app = express();
app.use(bodyParser.json());
app.use('/clientes', clientesRouter);

module.exports = app;
