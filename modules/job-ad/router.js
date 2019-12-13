const Router = require('express').Router;
const multer = require('multer');
const storage = multer.memoryStorage();
const send = multer({storage: storage});
const router = Router();
const _auth = require('../register/middlewares/auth')


router.get('/list',require('./callbacks/job-ad-list'))
router.get('/:ad_id',require('./callbacks/get-job-ad'))
router.post('/new', _auth, send.single('ad_photo'), require('./callbacks/new-job-ad'))

module.exports = router;
