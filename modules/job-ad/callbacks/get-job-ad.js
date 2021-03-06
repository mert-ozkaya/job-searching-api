const ObjectID = require('mongodb').ObjectID

module.exports = function(req,res){

  var ad_id = req.params.ad_id
  let pipeline = [{
    $match : { '_id': ObjectID(ad_id)}
  }]

  let collection = req.app.get('DB').collection('jobAds');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray();

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500).send('db-error');
  })


}
