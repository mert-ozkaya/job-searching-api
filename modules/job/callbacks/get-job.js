const ObjectID = require('mongodb').ObjectID


module.exports = function(req,res){

  var job_id = req.params.job_id
  let pipeline = [{
    $match : { '_id': ObjectID(job_id)}
  }]

  let collection = req.app.get('DB').collection('jobs');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray();

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500).send('db-error');
  })


}
