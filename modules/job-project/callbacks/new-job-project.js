const { uuid } = require('uuidv4');
module.exports = [
  validation
]

function validation(req,res,next) {
/*
  company_id (sonra eklenebilir)
  sourceCodeLanguages [ ]
*/
/*
  var job_ad_id = req.query.job_ad_id

  if(job_ad_id === undefined) {
    return res.status(400).send('undefined:job_ad_id')
  }
*/
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

  req.data.project_document_url = null
  req.data.sample_input_file_url = null
  req.data.sample_output_file_url = null
  req.data.sample_input_text = ""
  req.data.sample_output_text = ""

  next()
}

function uploadToS3(req,res,next) {

  



}
