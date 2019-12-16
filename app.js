const express = require('express');
const bodyParser =require('body-parser');
const cookieParser = require('cookie-parser');
const { exec } = require('child_process');
const cors = require('cors')
const app = express();
const debug = require('debug')('FindJob-api:app');
const moment = require('moment');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use(function(req, res, next) {
  req.data = {now: moment()};
  next();
});

// request debugger
app.use(function(req, res, next) {
  debug('%s %s - (%s) %s', moment().format(), req.ip, req.method, req.originalUrl);
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
    //console.log(req.body.date)
    //console.log(req.body.date + req.body.hour)
    var date = moment(req.body.date + req.body.hour, "YYYY/MM/DD h:mm:ss a").format();
    var date1 = new Date(date);
    var date2 = new Date(moment().format());
    //console.log("date1",date1.getTime())
    //console.log("date2",date2.getTime())
    let aaa = date2.getTime() - date1.getTime()
    var delta = Math.abs(aaa) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;

    res.send("days")
})
module.exports = app;
