var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('I\'m a lumberjack, and I\'m ok');
});

module.exports = router;
