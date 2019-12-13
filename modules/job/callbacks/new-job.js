
module.exports = function(req,res) {

  if(req.body.title === undefined) {
    return res.status(400).send('missing-parameter:job_title')
  }

  let data = {
    title: req.body.title
  }

  let collection = req.app.get('DB').collection('jobs');

  let p = collection.insertOne(data);

  p.then(function(result){
    res.sendStatus(200).send('yeni-meslek-kaydedildi')
  }).catch(function(err){
    console.log(err,"DB kayit basarisiz");
    res.sendStatus(500).send('db-error');
  });


}
