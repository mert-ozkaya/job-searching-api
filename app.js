const express = require('express');
const bodyParser =require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  req.data = {};
  next();
});

app.use('/companyInfo',require('./modules/company/router'))
app.use('/register',require('./modules/register/router'))


module.exports = app;
