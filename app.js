const express = require('express');
const bodyParser =require('body-parser');
const cookieParser = require('cookie-parser');
const { exec } = require('child_process');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use(function(req, res, next) {
  req.data = {};
  next();
});

app.use('/companyInfo', require('./modules/company/router'))
app.use('/register', require('./modules/register/router'))
app.use('/userInfo', require('./modules/register/middlewares/auth'),require('./modules/userInfo/router'))
app.use('/compile', require('./modules/compiling/router'))
app.use('/job', require('./modules/job/router'))
app.use('/country', require('./modules/country/router'))
app.use('/city', require('./modules/city/router'))
app.use('/job-ad', require('./modules/job-ad/router'))
app.use('/job-project',require('./modules/job-project/router'))


app.use('/test', function(req,res) {

  exec('c-executable\\a.exe', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
})
module.exports = app;
