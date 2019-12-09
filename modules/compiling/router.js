const Router = require('express').Router;
const multer = require('multer');

const storage = multer.memoryStorage();
const send = multer({storage: storage});

const _clear = require('./callbacks/clearLocalFiles')

const router = Router();

//router.get('/get/:company_id', require('./callbacks/get-company-info'))
router.post('/c-compile',send.single('c_source_code'), require('./callbacks/c-compile') , _clear)

module.exports = router;
