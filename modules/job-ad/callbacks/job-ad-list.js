const ObjectID = require('mongodb').ObjectID

module.exports = function(req,res){

  let pipeline = [
  {
    '$lookup': {
      'from': 'jobs',
      'localField': 'job_id',
      'foreignField': '_id',
      'as': 'job'
    }
  },
  {
      '$unwind':{
        'path': '$job'
      }
  },
  {
    '$lookup': {
      'from': 'company',
      'localField': 'company_id',
      'foreignField': '_id',
      'as': 'company'
    }
  },
  {
      '$unwind':{
        'path': '$company'
      }
  }
]

  let collection = req.app.get('DB').collection('jobAds');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray();
  var array_result = [];
  p.then((result) => {
    for(var i=0; i<result.length;i++)
    {
      var data = {
        _id: result[i]._id,
        title: result[i].title,
        description: result[i].description,
        company_title: result[i].company.companyTitle
      }
      array_result.push(data)
    }
    console.log(array_result)
    res.send(array_result)
  }).catch((err) => {
    res.status(500).send('db-error');
  })


}
