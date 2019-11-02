const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const settings = require('../../../settings');

module.exports = [
  authenticate,
  getUser
]

function authenticate(req, res, next) {
  //const access_token = req.cookies.access_token || req.get('Authorization') || null;
  access_token = req.body.auth

  if(access_token == null) {
    res.status(401).send('access_token_not_found');
    return;
  }

  jwt.verify(access_token, settings.jwt.publicKey, (err, decoded) => {
    if(err) {
      res.status(401).json(err);
      return;
    }
    req.user = decoded.user;
    next();
  });
}

function getUser(req, res, next) {
  let collection = req.app.get('DB').collection('register');
  let filter = {_id: ObjectID(req.user._id)};

  let p = collection.findOne(filter);
  p.then(result => {
    if(result) {
      req.user = result;
      next();
    } else return res.status(400).send('user__not_found');
  }).catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
}
