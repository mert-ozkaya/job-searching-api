const ObjectID = require('mongodb').ObjectID


module.exports = function(req,res){

  var city_id = req.params.city_id

  let filter = {
     '_id': ObjectID(city_id)
  }

  let collection = req.app.get('DB').collection('cities');
  let p = collection.findOne(filter)

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.status(500).send('db-error');
  })


}
