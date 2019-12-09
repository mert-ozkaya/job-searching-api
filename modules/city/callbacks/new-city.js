
module.exports = function(req,res) {

  if(req.body.city_title === undefined) {
    return res.status(400).send('missing-parameter:city_title')
  }

  let data = {
    title: req.body.city_title
  }

  let collection = req.app.get('DB').collection('cities');

  let p = collection.insertOne(data);

  p.then(function(result){
    res.sendStatus(200).send('saved-new-city')
  }).catch(function(err){
    console.log(err,"DB kayit basarisiz");
    res.sendStatus(500).send('db-error');
  });


}
