
module.exports = function(req,res) {

  if(req.body.country_title === undefined) {
    return res.status(400).send('missing-parameter:country_title')
  }

  let data = {
    title: req.body.country_title
  }

  let collection = req.app.get('DB').collection('countries');

  let p = collection.insertOne(data);

  p.then(function(result){
    res.sendStatus(200).send('saved-new-country')
  }).catch(function(err){
    console.log(err,"DB kayit basarisiz");
    res.sendStatus(500).send('db-error');
  });


}
