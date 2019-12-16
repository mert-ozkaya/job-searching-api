const ObjectID = require('mongodb').ObjectID

module.exports = [
  getProjectList,
  calculateRemaningTime

]

function getProjectList(req,res,next){

  let pipeline = [{
    '$lookup': {
      'from': 'register',
      'localField': 'user_id',
      'foreignField': '_id',
      'as': 'company'
    }
  },
  {
      '$unwind':{
        'path': '$company'
      }
  }]

  let collection = req.app.get('DB').collection('jobProject');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray();

  p.then((result) => {
    req.data.result = result
      next()
  }).catch((err) => {
    res.sendStatus(500).send('db-error');
  })

}


function calculateRemaningTime(req,res) {

  for(var i = 0; i<req.data.result.length; i++)
  {
    var date1 = new Date(req.data.now.format());
    var date2 = new Date(req.data.result[i].due_date);
    //console.log("date1",date1.getTime())
    //console.log("date2",date2.getTime())
    let subMiliSeconds = date2.getTime() - date1.getTime()
    var delta = Math.abs(subMiliSeconds) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;

    req.data.result[i].remaning_time = days + " gün " + hours + " saat " + minutes + " dakika " + seconds + " saniye"

  }

  res.send(req.data.result)
}
