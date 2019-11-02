const Router = require('express').Router;

const router = Router();

router.post('/sign-up', require('./callbacks/sign-up'))
router.post('/login', require('./callbacks/login'))
router.post('/check', require('./middlewares/auth'), require('./callbacks/auth-check'));
module.exports = router;
