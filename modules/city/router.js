const Router = require('express').Router;

const router = Router();

router.get('/list/:country_id',require('./callbacks/city-list'))
router.get('/:city_id',require('./callbacks/get-city'))
router.post('/new', require('./callbacks/new-city'))

module.exports = router;
