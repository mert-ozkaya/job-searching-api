const express = require('express');

const app = express();



  app.use(function(req, res, next) {
    res.send("running")
  });

module.exports = app;
