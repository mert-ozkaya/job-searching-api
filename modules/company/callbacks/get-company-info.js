const ObjectID = require('mongodb').ObjectID


module.exports = function(req,res){

  var company_id = req.params.company_id

  let filter = {
     '_id': ObjectID(company_id)
  }


  let collection = req.app.get('DB').collection('company');
  let p = collection.findOne(filter)

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.status(500).send('db-error');
  })


}
