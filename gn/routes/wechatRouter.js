const express = require('express');
const router = express.Router();
const co = require("co");
const https = require("https");
const crypto = require("crypto");

const xml2js = require('xml2js')
const common = require('../common/common.js')
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

router.get('/setUserInfo', function (req, resp, next) {
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
              if (!result.errcode) {
                result.access_token = access_token;
                result.refresh_token = refresh_token;
                wechatDao.setWechatUserInfo(result, function () {
                  resp.send({ state: 6, value: result });
                })
              } else {
                resp.send({ state: 0, err: result });
              }
            });
          }).on("error", function (err) {
            resp.send({ state: 0, err: err });
          });
        } else {
          resp.send({ state: 0, err: result });
        }
      });
    }).on("error", function (err) {
      resp.send({ state: 0, err: err });
    });
  }).catch(function (e) {
    resp.send({ state: 0, err: e });
  });
});

router.get('/getPayLink', function (req, resp, next) {
  const mch_id = "1518268001";
  const key = "youxuanYOUXUAN946578385496877346";
  let nonce_str = generateRandomAlphaNum(32);
  const pay_body = "优炫充值中心-问卷红包充值";
  const out_trade_no = new Date().getTime() + generateRandomAlphaNum(19);
  let total_fee = req.query.moneySum;
  const spbill_create_ip = "60.205.202.39";
  const notify_url = "http://ipromiseyourlife.com/wechat/getPayCallback";
  const trade_type = "NATIVE";
  let stringA = "appid=" + APPID + "&body=" + pay_body + "&mch_id=" + mch_id + "&nonce_str=" + nonce_str + "&notify_url=" + notify_url + "&out_trade_no=" + out_trade_no + "&spbill_create_ip=" + spbill_create_ip + "&total_fee=" + total_fee + "&trade_type=" + trade_type;
  let stringSignTemp = stringA + "&key=" + key;
  let sign = crypto.createHash("md5").update(stringSignTemp).digest("hex");
  let reqData = {
    "appid": APPID,
    "body": pay_body,
    "mch_id": mch_id,
    "nonce_str": nonce_str,
    "notify_url": notify_url,
    "out_trade_no": out_trade_no,
    "spbill_create_ip": spbill_create_ip,
    "total_fee": total_fee,
    "trade_type": trade_type,
    "sign": sign,
  }
  let builder = new xml2js.Builder({ headless: false, rootName: "xml" });
  let xml = builder.buildObject(reqData);
  let opts = {
    method: 'POST',
    host: 'api.mch.weixin.qq.com',
    port: 443,
    path: '/pay/unifiedorder',
    headers: {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xml)
    }
  }
  let post_req = https.request(opts, function (res) {
    let datas = [];
    let size = 0;
    res.on('data', function (data) {
      datas.push(data);
      size += data.length;
    })
    res.on('end', function () {
      let buff = Buffer.concat(datas, size);
      let parser = new xml2js.Parser();
      parser.parseString(buff.toString(), function (err, result) {
        console.log(result);
        if (result.xml.return_code[0] == "SUCCESS" && result.xml.return_msg[0] == "OK") {
          let obj = reqData;
          obj.userId = "userId";
          obj.state = "Unpaid";
          obj.prepay_id = result.xml.prepay_id[0];
          obj.code_url = result.xml.code_url[0];
          co(function* () {
            yield common.toPromise(wechatDao.setWechatPayInfo, obj);
            resp.send({ state: 1, data: { code_url: result.xml.code_url[0] } });
          }).catch(function (e) {
            resp.send({ state: 0, err: e });
          });
        } else {
          resp.send({ state: 0, err: { err_code: result.xml.err_code, err_code_des: result.xml.err_code_des } });
        }
      });
    })
  })
  post_req.on('error', function (err) {
    console.log('异常,异常原因' + err);
    resp.send({ state: 0, err: err });
  })
  post_req.write(xml);
  post_req.end();
});

router.post('/getPayCallback', function (req, resp, next) {
  co(function* () {
    console.log("---------------------------==================================")
    //解析xml
    var buf = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
      buf += chunk
    });
    req.on('end', function () {
      let parser = new xml2js.Parser();
      parser.parseString(buf, function (err, result) {
        console.log(result);
        if (!err) {
          console.error("error:"+ err)
          resp.send();
        } else {
          if (result.xml.return_code[0] == "SUCCESS") {
            let reqData = {
              "return_code": "SUCCESS",
              "return_msg": "OK",
            }
            let builder = new xml2js.Builder({ headless: false, rootName: "xml" });
            let xml = builder.buildObject(reqData);
            console.log(xml)
            resp.set('Content-Type', 'text/xml');
            resp.send(xml);
            // let obj = reqData;
            // obj.userId = "userId";
            // obj.state = "Unpaid";
            // obj.prepay_id = result.xml.prepay_id[0];
            // obj.code_url = result.xml.code_url[0];
            // co(function* () {
            //   yield common.toPromise(wechatDao.setWechatPayInfo, obj);
            //   resp.send({ state: 1, data: { code_url: result.xml.code_url[0] } });
            // }).catch(function (e) {
            //   resp.send({ state: 0, err: e });
            // });
          } else {
            console.log(result.xml.err_code, result.xml.err_code_des)
            resp.send();
          }
        }
      });
    });
  }).catch(function (e) {
    resp.send({ state: 0, err: e });
  });
});

function generateRandomAlphaNum(len) {
  var rdmString = "";
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len);
}


module.exports = router;
