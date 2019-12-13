const ObjectID = require('mongodb').ObjectID


module.exports = function(req,res){

  var job_id = req.params.job_id

  let filter = {
     '_id': ObjectID(job_id)
  }

  let collection = req.app.get('DB').collection('jobs');
  let p = collection.findOne(filter)

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.status(500).send('db-error');
  })


}
