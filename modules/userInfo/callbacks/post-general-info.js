

module.exports = function (req,res) {

  let generalInfo = {
    contact: {
      phone : '',
      address: {
        country : '',
        city: '',
        district: '',
        details: ''
        }
      },
    gender: '',
    military: '',
    dateOfBirthday: '',
    summaryInfo: ''
    }


    if(req.body.phone)
      generalInfo.contact.phone = req.body.phone

    if(req.body.country)
      generalInfo.contact.address.country = req.body.country

    if(req.body.city)
      generalInfo.contact.address.city = req.body.city

    if(req.body.district)
      generalInfo.contact.address.district = req.body.district

    if(req.body.details)
      generalInfo.contact.address.details = req.body.details

    if(req.body.gender)
      generalInfo.gender = req.body.gender

    if(req.body.military)
      generalInfo.military = req.body.military

    if(req.body.dateOfBirthday)
      generalInfo.dateOfBirthday = req.body.dateOfBirthday

    if(req.body.summaryInfo)
      generalInfo.summaryInfo = req.body.summaryInfo


    let collection = req.app.get('DB').collection('userGeneralInfo')

    let p = collection.insertOne(generalInfo)

    p.then((result) => {
      res.sendStatus(200).send('genel-bilgiler-kaydedildi')
    }).catch((error) => {
      res.sendStatus(500).send('db-error')
    })


}
