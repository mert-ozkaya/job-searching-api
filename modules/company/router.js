const Router = require('express').Router;

const router = Router();

router.get('/get/:company_id', require('./callbacks/get-company-info'))
router.post('/post', require('./callbacks/post-company-info'))

module.exports = router;
