const ObjectID = require('mongodb').ObjectID

module.exports = function(req,res){

  let pipeline = []

  let collection = req.app.get('DB').collection('jobAds');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray();

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.status(500).send('db-error');
  })


}
