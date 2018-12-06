const express = require('express');
const router = express.Router();
const co = require("co");
const wechatDao = require("../dao/wechatDao.js");

/* GET home page. */
router.get('/', function (req, res, next) {
  co(function* () {
    wechatDao.setWechatUserInfo("",function(){
      res.send("yes")
    })
  }).catch(function (e) {
    res.send("no")
  });
});

router.get('/check', function (req, res, next) {
  console.log(req.query.echostr)
  res.send(req.query.echostr)
});

module.exports = router;
