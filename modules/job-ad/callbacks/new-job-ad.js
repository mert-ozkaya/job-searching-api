const { uuid } = require('uuidv4');
module.exports = [
  validation,
  photoValidation,
  uplaodDB
]

function validation(req,res,next) {
  var company_id = req.params.company_id

  if(req.body.job_id === undefined) {
    return res.status(400).send('not-selected-job')
  }

  if(company_id === undefined) {
    return res.status(400).send('undefined:company_id')
  }

  if(req.body.country_id === undefined) {
    return res.status(400).send('undefined:country_id')
  }

  if(req.body.city_id === undefined) {
    return res.status(400).send('undefined:city_id')
  }

  if(req.body.address_details === undefined) {
    return res.status(400).send('missing-parameter:address_details')
  }

  if(req.body.title === undefined){
    return res.status(400).send('missing-parameter:job-title')
  }

  if(req.body.description === undefined) {
    return res.status(400).send('missing-parameter:job-description')
  }


  req.data.ad_photo_url = null
  next()
}

function photoValidation(req,res,next) {

  if(req.file) {

    if(req.file.mimetype == 'image/jpeg') {
      extension = '.jpg'
      req.data.extension = extension
    }else if(req.file.mimetype == 'image/png') {
      extension = '.png'
      req.data.extension = extension
    }

    let s3 = new AWS.S3(settings.aws.s3.config);

    req.data.fileName = Date.now().toString(36) + uuid() + req.data.extension

    let params = {
      ACL: 'public-read',
      Bucket: settings.aws.s3.bucket,
      Key: 'job-ad-images/' + req.data.fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }


    let p = s3.upload(params).promise()

    p.then((result) => {
      req.data.ad_photo_url = result.Location;
      next()
    }).catch((err) => {
        console.log(err)
        res.status(500).send('could-not-upload-to-s3');
    })

  } else {
    next()
  }


}


function uplaodDB(req,res) {

  let data = {
    job_id: req.body.job_id,
    company_id: req.params.company_id,
    address: {
      country_id : req.body.country_id,
      city_id: req.body.city_id,
      address_details: req.body.address_details
    },
    title: req.body.title,
    description: req.body.description,
    ad_photo_url: req.data.ad_photo_url
  }

  let collection = req.app.get('DB').collection('jobAds');

  let p = collection.insertOne(data);

  p.then(function(result){
    res.sendStatus(200).send('saved-new-job-ad')
  }).catch(function(err){
    console.log(err,"DB kayit basarisiz");
    res.sendStatus(500).send('db-error');
  });
}
