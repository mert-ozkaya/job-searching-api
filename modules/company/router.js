const Router = require('express').Router;

const router = Router();

router.get('/get/:company_id', require('./callbacks/get-company-info'))
//router.post('/post-university', require('./callbacks/post-university'

module.exports = router;
