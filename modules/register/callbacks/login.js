const jwt = require('jsonwebtoken');
const settings = require('../../../settings');

 function checkEposta(req,res,next) {

     let collection = req.app.get('DB').collection('register');

     let query = {email: req.body.email};

     let p = collection.findOne(query);
     p.then(result => {
       if(result) {
         req.data.user = result;
         next();
       }
       else {
         res.status(401).send('user-not-found');
       }

     }).catch(err => {
       res.status(500).json(err);
     });
}

function checkPassword(req, res,next) {

  if(req.body.password === req.data.user.password) {
    next()
  }
  else {
    res.status(401).send('wrong-password')
  }

}

function generateAccessToken(req, res, next) {
  let payload = {
    user: {
      _id: req.data.user._id,
      email: req.data.user.email,
      name: req.data.name,
      surname: req.data.surnmame
    },
    token_use: 'access'
  };


  let options = {
    algorithm: 'RS256',
    subject: req.data.user._id.toString(),
    expiresIn: "365 days"
  };

  req.data.access_token = jwt.sign(payload, settings.jwt.privateKey, options);

  next();
}


function sendResponse(req, res) {
  res.json({
    access_token: req.data.access_token
  });
}


module.exports = [checkEposta,checkPassword, generateAccessToken, sendResponse]
