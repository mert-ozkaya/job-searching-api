const ObjectID = require('mongodb').ObjectID


module.exports = function(req,res){

  var country_id = req.params.country_id
  let pipeline = [{
    $match : { '_id': ObjectID(country_id)}
  }]

  let collection = req.app.get('DB').collection('countries');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray();

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500).send('db-error');
  })


}
