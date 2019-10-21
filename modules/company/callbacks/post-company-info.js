
module.exports = function(req,res) {

  console.log(req.body)

//TODO phone var mı yok mu kontrol et veya ile otomatik boşluk koymayı dene
  let company = {
    companyTitle: req.body.companyTitle,
    contact: {
      eposta: req.body.eposta,
      phone : req.body.phone || "",
      address: {
        city: req.body.city,
        district: req.body.district,
        details: req.body.addressDetails
      }
    },
    companyDescription: req.body.companyDesc

  }
  res.end("basarili")

  let collection = req.app.get('DB').collection('company');

  let p = collection.insertOne(req.body);




  p.then(function(result){
    console.log("kayit basarili")
  }).catch(function(err){
    console.log(err);
    res.sendStatus(500);
  });
}
