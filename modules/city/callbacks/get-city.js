const ObjectID = require('mongodb').ObjectID


module.exports = function(req,res){

  var city_id = req.params.city_id
  let pipeline = [{
    $match : { '_id': ObjectID(city_id)}
  }]

  let collection = req.app.get('DB').collection('cities');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray();

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500).send('db-error');
  })


}
