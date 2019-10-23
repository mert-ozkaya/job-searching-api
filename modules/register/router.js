const Router = require('express').Router;

const router = Router();

router.post('/sign-up', require('./callbacks/sign-up'))
router.post('/login', require('./callbacks/login'))

module.exports = router;
