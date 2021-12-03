const express = require('express');
const routeador = require('./routers/router');

const app = express();

app.use(express.json());
app.use(routeador);

module.exports = app;