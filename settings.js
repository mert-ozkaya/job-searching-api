let fs = require('fs');

var settings, privateKey, publicKey;

  settings = require('./settings.json');
  privateKey = fs.readFileSync('./keys/private/jwt.key');
  publicKey = fs.readFileSync('./keys/public/jwt.pem');


settings.jwt = {
  privateKey: privateKey,
  publicKey: publicKey
};

module.exports = settings;
