const ObjectID = require('mongodb').ObjectID


module.exports = function(req,res){

  var company_id = req.params.company_id
  let pipeline = [{
    $match : { '_id': ObjectID(company_id)}
  }]

  let collection = req.app.get('DB').collection('company');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray();

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500).send('db-error');
  })


}
