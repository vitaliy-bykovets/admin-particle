var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({response: 'hello from user router'})
});

module.exports = router;
