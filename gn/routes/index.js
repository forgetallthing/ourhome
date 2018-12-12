var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/m', function(req, res, next) {
  res.render('form', { title: 'Express' });
});

router.get('/check', function(req, res, next) {
  console.log(req.query.echostr)
  res.send(req.query.echostr)
});

module.exports = router;
