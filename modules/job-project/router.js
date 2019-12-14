const Router = require('express').Router;
const _auth = require('../register/middlewares/auth')

const multer = require('multer');
const storage = multer.memoryStorage();
const send = multer({storage: storage});
const router = Router();

var filesUpload = send.fields([
  { name: 'project_doc', maxCount: 1 },
  { name: 'sample_input', maxCount: 1 },
  { name: 'sample_output', maxCount: 1}
 ])

router.get('/list',require('./callbacks/job-project-list'))
router.get('/:job_ad_id',require('./callbacks/get-job-project'))

router.post('/new', _auth, filesUpload, require('./callbacks/new-job-project'))

module.exports = router;
