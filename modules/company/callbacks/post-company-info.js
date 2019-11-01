
module.exports = function(req,res) {

  console.log(req.body)

//TODO phone var mı yok mu kontrol et veya ile otomatik boşluk koymayı dene
  let company = {
    companyTitle: req.body.companyTitle,
    contact: {
      eposta: req.body.eposta,
      phone : req.body.phone,
      address: {
        city: req.body.city,
        district: req.body.district,
        details: req.body.addressDetails
      }
    },
    companyDescription: req.body.companyDescription

  }
  res.end("basarili")

  let collection = req.app.get('DB').collection('company');

  let p = collection.insertOne(company);


  p.then(function(result){
    res.sendStatus(200).send('sirket-bilgileri-kaydedildi')
  }).catch(function(err){
    console.log(err,"DB kayit basarisiz");
    res.sendStatus(500).send('db-error');
  });
}
