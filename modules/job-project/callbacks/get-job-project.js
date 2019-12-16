const ObjectID = require('mongodb').ObjectID

module.exports = function (req,res){

  var _id = req.params._id

  let filter = {
    "_id": ObjectID(_id)
  }

  let collection = req.app.get('DB').collection('jobProject');
  let p = collection.findOne(filter)

  p.then((result) => {
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500).send('db-error');
  })


}
