const express = require('express');
const router = express.Router();
const co = require("co");
const https = require("https");
const wechatDao = require("../dao/wechatDao.js");
const APPID = "wx986fbde73494c321";
const SECRET = "51dd60cf87edc438b11e240cb88070d9";

/* GET home page. */
router.get('/', function (req, res, next) {
  co(function* () {
    wechatDao.setWechatUserInfo("", function () {
      res.send("yes")
    })
  }).catch(function (e) {
    res.send("no")
  });
});

router.get('/setUserInfo', function (req, res, next) {
  co(function* () {
    let code = req.query.code;
    const access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APPID + "&secret=" + SECRET + "&code=" + code + "&grant_type=authorization_code";
    https.get(access_token_url, function (res) {
      let datas = [];
      let size = 0;
      res.on('data', function (data) {
        datas.push(data);
        size += data.length;
      });
      res.on("end", function () {
        let buff = Buffer.concat(datas, size);
        let result = JSON.parse(buff.toString());
        console.log(result);
        if (result.access_token && result.scope == "snsapi_userinfo") {
          //获取用户信息
          let openId = result.openid;
          let access_token = result.access_token;
          let refresh_token = result.refresh_token;
          const user_info_url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openId + "&lang=zh_CN";
          https.get(user_info_url, function (res) {
            let datas = [];
            let size = 0;
            res.on('data', function (data) {
              datas.push(data);
              size += data.length;
            });
            res.on("end", function () {
              let buff = Buffer.concat(datas, size);
              let result = JSON.parse(buff.toString());
              console.log(result);
              if (!result.errcode) {
                result.access_token = access_token;
                result.refresh_token = refresh_token;
                wechatDao.setWechatUserInfo(result, function () {
                  res.send({ state: 1, res: "yes" });
                })
              } else {
                res.send({ state: 0, err: result });
              }
            });
          }).on("error", function (err) {
            res.send({ state: 0, err: err });
          });
        } else {
          res.send({ state: 0, err: result });
        }
      });
    }).on("error", function (err) {
      res.send({ state: 0, err: err });
    });
  }).catch(function (e) {
    res.send({ state: 0, err: e });
  });
});

module.exports = router;
