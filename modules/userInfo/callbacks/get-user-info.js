const ObjectID = require('mongodb').ObjectID


function getUserInfo(req,res) {
  let pipeline = [{
      $match: {'_id': ObjectID(req.data.user._id)}
  }]

  let collection = req.app.get('DB').collection('userInfo')
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray()

  p.then((result) => {
    res.json(result)
  }).catch((err) => {
    res.sendStatus(500).send('db-error')
  })
}

module.exports = [getUserInfo]
