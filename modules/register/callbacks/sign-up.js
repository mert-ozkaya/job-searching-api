const validator = require('validator');
const moment = require('moment');

function validationSignup(req, res, next) {
  if(req.body.name === undefined)
    return res.status(400).send('bos-veya-gecersiz-isim');

  if(req.body.surname === undefined)
    return res.status(400).send('bos-veya-gecersiz-soyisim');

  if(req.body.email === undefined)
    return res.status(400).send('bos-veya-gecersiz-email');

  if(!validator.isEmail(req.body.email))
    return res.status(400).send('gecersiz-email');

  if(req.body.password === undefined)
    return res.status(400).send('bos-veya-gecersiz-sifre');

  if(req.body.password.length < 8)
    return res.status(400).send('sifre-min-8-karakter-olmali');

  if(req.body.password.length > 16)
    return res.status(400).send('sifre-max-8-karakter-olmali');

  if(!req.body.password.match(/\d+/g))
    return res.status(400).send('sifre-en-az-1-sayı-icermeli');


  next();
}

function saveUser(req, res, next) {
  let user = {
    name: req.body.name,
    surname: req.body.surname,
    account_type: parseInt(req.body.account_type),  //1 admin, 2 normal user, 3 işveren user
    email: req.body.email,
    password: req.body.password,
    created_at: moment().format()
  };

  let collection = req.app.get('DB').collection('register');
  let p = collection.insertOne(user);
  p.then(result => {
    res.json({
      message: 'Kayıt başarılı.'
    })
  }).catch(error => {
    res.status(500).json(error);
  });
}



module.exports = [validationSignup,saveUser]
