const Router = require('express').Router;

const router = Router();

router.get('/get', require('./callbacks/get-user-info'))
router.post('/post', require('./callbacks/post-general-info'))
router.post('/post',require('./callbacks/post-school-info'))
module.exports = router;
