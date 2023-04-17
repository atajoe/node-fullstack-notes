var express = require('express');
var router = express.Router();
const path = require('path');
console.log('here is the directory', __dirname)
router.use(express.static('../build'))

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
