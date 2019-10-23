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

function checkPassword(req, res) {

  if(req.body.password === req.data.user.password) {
    res.json({
      message: `Hoşgeldin ${req.data.user.name} ${req.data.user.surname}`
    })
  }
  else {
    res.status(401).send('wrong-password')
  }

}

/*
  function createToken(req,res,next) {

    next()
  }
*/

module.exports = [checkEposta,checkPassword]
