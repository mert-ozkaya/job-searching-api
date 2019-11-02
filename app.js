const express = require('express');
const bodyParser =require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  req.data = {};
  console.log("req.data:  ", req.data)
  next();
});

app.use('/companyInfo',require('./modules/company/router'))
app.use('/register',require('./modules/register/router'))
app.use('/userInfo',require('./modules/register/middlewares/auth'),require('./modules/userInfo/router'))
app.use('/auth', require('./modules/register/router'));
module.exports = app;
