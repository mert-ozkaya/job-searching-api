const Router = require('express').Router;

const router = Router();

router.get('/list',require('./callbacks/country-list'))
router.get('/:country_id',require('./callbacks/get-country'))
router.post('/new', require('./callbacks/new-country'))

module.exports = router;
