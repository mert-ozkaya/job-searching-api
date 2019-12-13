
module.exports = function(req,res) {

  if(req.body.name === undefined) {
    return res.status(400).send('missing-parameter:city_name')
  }

  let data = {
    title: req.body.name
  }

  let collection = req.app.get('DB').collection('cities');

  let p = collection.insertOne(data);

  p.then(function(result){
    res.send('saved-new-city')
  }).catch(function(err){
    console.log(err,"DB kayit basarisiz");
    res.status(500).send('db-error');
  });


}
