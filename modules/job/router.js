const Router = require('express').Router;

const router = Router();

router.get('/list',require('./callbacks/job-list'))
router.get('/:job_id',require('./callbacks/get-job'))
router.post('/new', require('./callbacks/new-job'))

module.exports = router;
