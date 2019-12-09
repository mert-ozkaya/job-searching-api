const fs = require('fs')
const { uuid } = require('uuidv4');
const path = require('path');
const AWS = require('aws-sdk');
const { execFile } = require('child_process');
const moment = require('moment');

const settings = require('../../../settings.json')

module.exports = [
  validationSourceCode,
  assignFileName,
  compileAndCreateExecutable,
  executeProgram,
  uploadSourceCodeToS3,
  uploadExecutableFileToS3,
  uploadDB
]

function validationSourceCode(req,res,next) {
  let extension = path.extname(req.file.originalname)

  if(req.file === undefined) {
    return res.status(400).send('missing-file:source_code');
  }

  if(extension != '.c' && extension != '.cpp'){
    return res.status(400).send('wrong-source-code-type');
  }
  next()
}

function assignFileName(req, res, next) {

  req.data.extension = path.extname(req.file.originalname);

  if(req.data.extension == '.c') {
    req.data.source_name = Date.now().toString(36) + uuid()
    req.data.full_source_name = req.data.source_name + req.data.extension
    req.data.source_path = './c-source-codes/' + req.data.full_source_name

    fs.writeFile(req.data.source_path, req.file.buffer, (err) => {
    if (err) throw err;
    //console.log('C source code file has been saved!');
  });

  }
  else if(req.data.extension == '.cpp'){
      req.data.source_name = Date.now().toString(36) + uuid()
      req.data.full_source_name = req.data.source_name + req.data.extension
      req.data.source_path = './cpp-source-codes/' + req.data.full_source_name

      fs.writeFile(req.data.source_path, req.file.buffer, (err) => {
      if (err) throw err;
      console.log('C++ source code file has been saved!');
    });

  }
  else return res.status(500).send('assignFileName-server-error')

  //console.log("req.data.extension:",req.data.extension)
  //console.log("req.data.source_name:",req.data.source_name)

  next()
}

function compileAndCreateExecutable(req,res,next) {

  if(req.data.extension == '.c') {
    let c_executable = './c-executable/' + req.data.source_name
    //console.log('c_executable----::',c_executable)
    //console.log('req.data.source_path :' ,req.data.source_path)

    const child = execFile('gcc', [req.data.source_path,'-o',c_executable], (error, stdout, stderr) => {
      if (error) {
        console.error('stderr: ', stderr);
        throw error;
      }
      //console.log('stdout: ',stdout);
      next()
    });
  }
  else if(req.data.extension == '.cpp') {
    let cpp_executable = './cpp-executable/' + req.data.source_name
    const child = execFile('gcc', [req.data.source_path,'-o',cpp_executable], (error, stdout, stderr) => {
      if (error) {
        console.error('stderr: ', stderr);
        throw error
      }
      //console.log('stdout: ',stdout);
      next()
    });
  }

}

function executeProgram(req,res,next) {

  if(req.data.extension == '.c'){
    let executePath = 'c-executable\\' + req.data.source_name + '.exe'
    execFile(executePath, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      //console.log(`stdout: ${stdout}`);
      //console.error(`stderr: ${stderr}`);
      req.data.output = stdout
      next()
    });
  }else if(req.data.extension == '.cpp'){
    let executePath = 'cpp-executable\\' + req.data.source_name + '.exe'

    execFile(executePath, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      //console.log(`stdout: ${stdout}`);
      //console.error(`stderr: ${stderr}`);
      req.data.output = stdout
      next()
    });
  }

}

function uploadSourceCodeToS3(req, res, next) {

    let s3 = new AWS.S3(settings.aws.s3.config);
  if(req.data.extension == '.c') {
    req.data.s3_source_path = 'c-source-codes/' + req.data.full_source_name
    let params = {
      ACL: 'public-read',
      Bucket: settings.aws.s3.bucket,
      Key: req.data.s3_source_path,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }

    let p = s3.upload(params).promise();
    p.then(result => {
      req.data.source_code_location = result.Location
      next()
    }).catch(error => {
      console.log(error);
    });
  }
  else if(req.data.extension == '.cpp') {
    req.data.s3_source_path = 'cpp-source-codes/' + req.data.full_source_name

    let params = {
      ACL: 'public-read',
      Bucket: settings.aws.s3.bucket,
      Key: req.data.s3_source_path,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }

    let p = s3.upload(params).promise();
    p.then(result => {
      req.data.source_code_location = result.Location
      next()
    }).catch(error => {
      console.log(error);
    });

  }
  else return res.status(400).send("error-upload-to-s3")

}

function uploadExecutableFileToS3(req, res, next) {
    let s3 = new AWS.S3(settings.aws.s3.config);

  if(req.data.extension == '.c') {
    req.data.executable_path = 'c-executable/' + req.data.source_name + '.exe'

    fs.readFile(req.data.executable_path, function read(err, data) {
        if (err) throw err;

        let params = {
          ACL: 'public-read',
          Bucket: settings.aws.s3.bucket,
          Key: req.data.executable_path,
          Body: data
        }

        let p = s3.upload(params).promise();
        p.then(result => {
          req.data.executable_location = result.Location
          next()
        }).catch(error => {
          console.log(error);
        });
    });
  }
  else if(req.data.extension == '.cpp') {
    req.data.executable_path = 'cpp-executable/' + req.data.source_name + '.exe'

    fs.readFile(req.data.executable_path, function read(err, data) {
        if (err) throw err;

        let params = {
          ACL: 'public-read',
          Bucket: settings.aws.s3.bucket,
          Key: req.data.executable_path,
          Body: data
        }

        let p = s3.upload(params).promise();
        p.then(result => {
          req.data.executable_location = result.Location
          next()
        }).catch(error => {
          console.log(error);
        });
    });

  }
  else return res.status(400).send("error-upload-to-s3")

}

function uploadDB(req,res,next) {

  let data = {
    job_project_id : null,
    user_id: null,
    results : [{
      sourceCodeFileUrl: req.data.source_code_location,
      executableFileUrl: req.data.executable_location,
      output: req.data.output,
      projectReportUrl: null,
      upload_at: moment().format()
    }]

  }

  let collection = req.app.get('DB').collection('projectOutputs');
  let p = collection.insertOne(data);

  p.then(function(result) {
    res.send("kayit basarili ve executable olustu")
    next()
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  })
}
