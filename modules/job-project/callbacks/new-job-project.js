const uuidv4 = require('uuid/v4');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const AWS = require('aws-sdk');
const settings = require('../../../settings.json')

module.exports = [
  validation,
  uploadProjectDocToS3,
  uploadSampleInputToS3,
  uploadSampleOutputToS3,
  uploadToDB
]

function validation(req,res,next) {

  if(req.body.title === undefined){
    return res.status(400).send('missing-parameter:job-project-title')
  }

  if(req.body.description === undefined) {
    return res.status(400).send('missing-parameter:job-project-description')
  }

  if(req.body.starting_date === undefined) {
    return res.status(400).send('undefined:starting_date')
  }

  if(req.body.due_date === undefined) {
    return res.status(400).send('undefined:due_date')
  }

  if(req.files.project_doc === undefined) {
    return res.status(400).end('undefined:project_doc')
  }

  if(req.files.sample_input === undefined) {
    return res.status(400).end('undefined:sample_input')
  }

  if(req.files.sample_output === undefined) {
    return res.status(400).end('undefined:sample_output')
  }

  req.data.project_document_url = null
  req.data.sample_input_file_url = null
  req.data.sample_output_file_url = null
  //req.data.sample_input_text = ""
  //req.data.sample_output_text = ""

  next()
}

function uploadProjectDocToS3(req,res,next) {

    if(req.files.project_doc[0].mimetype == 'application/pdf'){
      req.data.extension = '.pdf'
    }else {
      res.status(400).send('Ayrıntılı Proje Dokümanı PDF formatında olmalıdır.')
    }

    req.data.fileName = Date.now().toString(36)+uuidv4() + req.data.extension
    let key = 'job-project/project-doc/' + req.data.fileName


    let s3 = new AWS.S3(settings.aws.s3.config);
    let params = {
      ACL: 'public-read',
      Bucket: settings.aws.s3.bucket,
      Key: key,
      Body: req.files.project_doc[0].buffer,
      ContentType: req.files.project_doc[0].mimetype
    }

    let p = s3.upload(params).promise()

    p.then((result) => {
      req.data.project_document_url = result.Location
      next()
    }).catch((err) => {
        res.status(500).send('could-not-upload-to-s3');
    })

}

function uploadSampleInputToS3(req,res,next) {

    if(req.files.sample_input[0].mimetype == 'text/plain'){
      req.data.extension = '.txt'
    }else {
      res.status(400).send('Örnek input txt formatında olmalıdır.')
    }

    req.data.fileName = Date.now().toString(36)+uuidv4() + req.data.extension
    let key = 'job-project/sample-input/' + req.data.fileName

    let s3 = new AWS.S3(settings.aws.s3.config);
    let params = {
      ACL: 'public-read',
      Bucket: settings.aws.s3.bucket,
      Key: key,
      Body: req.files.sample_input[0].buffer,
      ContentType: req.files.sample_input[0].mimetype
    }

    let p = s3.upload(params).promise()

    p.then((result) => {
      req.data.sample_input_file_url = result.Location
      next()
    }).catch((err) => {
        res.status(500).send('could-not-upload-to-s3');
    })
}

function uploadSampleOutputToS3(req,res,next) {

    if(req.files.sample_output[0].mimetype == 'text/plain'){
      req.data.extension = '.txt'
    }else {
      res.status(400).send('Örnek output txt formatında olmalıdır.')
    }

    req.data.fileName = Date.now().toString(36)+uuidv4() + req.data.extension
    let key = 'job-project/sample-output/' + req.data.fileName

    let s3 = new AWS.S3(settings.aws.s3.config);
    let params = {
      ACL: 'public-read',
      Bucket: settings.aws.s3.bucket,
      Key: key,
      Body: req.files.sample_output[0].buffer,
      ContentType: req.files.sample_output[0].mimetype
    }

    let p = s3.upload(params).promise()
    p.then((result) => {
      req.data.sample_output_file_url = result.Location
      next()
    }).catch((err) => {
        res.status(500).send('could-not-upload-to-s3');
    })

}

function uploadToDB(req,res) {

   let data = {
     user_id: ObjectID(req.user._id),
     title: req.body.title,
     description: req.body.description,
     starting_date: req.body.starting_date,
     due_date: req.body.due_date,
     languages: req.body.languages,
     project_document_url : req.data.project_document_url,
     sample_input_file_url : req.data.sample_input_file_url,
     sample_output_file_url : req.data.sample_output_file_url,
     created_at: moment().format()
   }

  let collection = req.app.get('DB').collection('jobProject');
  let p = collection.insertOne(data);
  p.then(function(result) {
    res.end('Proje Kaydı Başarılı.')
  }).catch(function(err) {
    console.log(err);
    res.sendStatus(500);
  });
}
