const express = require('express');
const bodyParser =require('body-parser');

const app = express();

app.use(bodyParser.json());


app.use('/companyInfo',require('./modules/company/router'))

module.exports = app;
