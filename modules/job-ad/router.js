const Router = require('express').Router;
const multer = require('multer');
const storage = multer.memoryStorage();
const send = multer({storage: storage});
const router = Router();



router.get('/list',require('./callbacks/job-ad-list'))
router.get('/:ad_id',require('./callbacks/get-job-ad'))
router.post('/new/:company_id',send.single('ad_photo'), require('./callbacks/new-job-ad'))

module.exports = router;
