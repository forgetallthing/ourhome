const express = require('express');
const router = express.Router();
const co = require("co");
const https = require("https");
const crypto = require("crypto");
const fs = require('fs');

const xml2js = require('xml2js')
const common = require('../common/common.js')
const wechatDao = require("../dao/wechatDao.js");
const APPID = "wx986fbde73494c321";
const SECRET = "51dd60cf87edc438b11e240cb88070d9";
const key = "youxuanYOUXUAN946578385496877346";

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
                  resp.send({ state: 5, value: result });
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
      xml2js.parseString(buff.toString(), {
        explicitArray: false,
      }, function (err, result) {
        console.log(result);
        if (result.xml.return_code == "SUCCESS" && result.xml.return_msg == "OK") {
          let obj = reqData;
          obj.userId = "userId";
          obj.state = "Unpaid";
          obj.prepay_id = result.xml.prepay_id;
          obj.code_url = result.xml.code_url;
          obj.get_time = new Date().getTime();
          co(function* () {
            yield common.toPromise(wechatDao.setWechatPayInfo, obj);
            resp.send({ state: 1, data: { code_url: result.xml.code_url } });
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
  //接受xml格式数据
  var buf = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    buf += chunk
  });
  req.on('end', function () {
    xml2js.parseString(buf, {
      explicitArray: false,
    }, function (err, result) {
      if (err) {
        console.error("error:" + err)
        resp.send();
      } else {
        if (result.xml.return_code == "SUCCESS") {
          let data = {
            out_trade_no: result.xml.out_trade_no,
            time_end: result.xml.time_end,
            bank_type: result.xml.bank_type,
            cash_fee: result.xml.cash_fee,
            is_subscribe: result.xml.is_subscribe,
            openid: result.xml.openid,
            transaction_id: result.xml.transaction_id,
            state: "Paid",
          }
          console.log(data);
          co(function* () {
            yield common.toPromise(wechatDao.setWechatPayState, data);
            let reqData = {
              "return_code": "SUCCESS",
              "return_msg": "OK",
            }
            let builder = new xml2js.Builder({ headless: false, rootName: "xml" });
            let xml = builder.buildObject(reqData);
            resp.set('Content-Type', 'text/xml');
            resp.send(xml);
          }).catch(function (e) {
            resp.send({ state: 0, err: e });
          });
        } else {
          console.log(result.xml.err_code, result.xml.err_code_des)
          resp.send();
        }
      }
    });
  });
});

router.get('/sendRedBag', function (req, resp, next) {
  let reqData = {
    "act_name": "答问卷拿红包",
    "client_ip": "103.83.44.48",
    "mch_billno": new Date().getTime() + generateRandomAlphaNum(15),
    "mch_id": "1518268001",
    "nonce_str": generateRandomAlphaNum(32),
    "re_openid": "oUdib1XEfEyhNHMpBDF3kGSDySNo",
    "remark": "感谢您填写问卷~",
    "send_name": "北京市统计局",
    "total_amount": 100,
    "total_num": 1,
    "wishing": "感谢您参加答问卷拿红包活动，给您拜个早年！",
    "wxappid": APPID,
  }
  // reqData.mch_billno = "1545041682326x5onto6pzfbl8m6"
  let stringA = "act_name=" + reqData.act_name + "&client_ip=" + reqData.client_ip + "&mch_billno=" + reqData.mch_billno + "&mch_id=" + reqData.mch_id + "&nonce_str=" + reqData.nonce_str + "&re_openid=" + reqData.re_openid + "&remark=" + reqData.remark + "&send_name=" + reqData.send_name + "&total_amount=" + reqData.total_amount + "&total_num=" + reqData.total_num + "&wishing=" + reqData.wishing + "&wxappid=" + reqData.wxappid;
  let stringSignTemp = stringA + "&key=" + key;
  let sign = crypto.createHash("md5").update(stringSignTemp).digest("hex");
  reqData.sign = sign;
  let builder = new xml2js.Builder({ headless: false, rootName: "xml" });
  let xml = builder.buildObject(reqData);
  let opts = {
    method: 'POST',
    host: 'api.mch.weixin.qq.com',
    port: 443,
    path: '/mmpaymkttransfers/sendredpack',
    headers: {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xml)
    },
    pfx: fs.readFileSync('./gn/cert/apiclient_cert.p12'),
    passphrase: reqData.mch_id,
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
      xml2js.parseString(buff.toString(), {
        explicitArray: false,
      }, function (err, result) {
        console.log(result);
        if (result.xml.return_code == "SUCCESS" && result.xml.result_code == "SUCCESS") {
          let obj = reqData;
          obj.get_time = new Date().getTime();
          // co(function* () {
          //   yield common.toPromise(wechatDao.setWechatPayInfo, obj);
          //   resp.send({ state: 1, data: { code_url: result.xml.code_url } });
          // }).catch(function (e) {
          //   resp.send({ state: 0, err: e });
          // });
          resp.send({ state: 0, data: result.xml });
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

let x = {
  xml:
    {
      return_code: 'SUCCESS',
      return_msg: '请求已受理，请稍后使用原单号查询发放结果',
      result_code: 'FAIL',
      err_code: 'PROCESSING',
      err_code_des: '请求已受理，请稍后使用原单号查询发放结果',
      mch_billno: '1545041682326x5onto6pzfbl8m6',
    }
}

router.get('/getSendRedBagState', function (req, resp, next) {
  let reqData = {
    "appid": APPID,
    "bill_type": "MCHT",
    "mch_billno": "15450431377070jhxps8a8w9vv2o",
    "mch_id": "1518268001",
    "nonce_str": generateRandomAlphaNum(32),
  }
  let stringA = "appid=" + reqData.appid + "&bill_type=" + reqData.bill_type + "&mch_billno=" + reqData.mch_billno + "&mch_id=" + reqData.mch_id + "&nonce_str=" + reqData.nonce_str;
  let stringSignTemp = stringA + "&key=" + key;
  let sign = crypto.createHash("md5").update(stringSignTemp).digest("hex");
  reqData.sign = sign;
  let builder = new xml2js.Builder({ headless: false, rootName: "xml" });
  let xml = builder.buildObject(reqData);
  let opts = {
    method: 'POST',
    host: 'api.mch.weixin.qq.com',
    port: 443,
    path: '/mmpaymkttransfers/gethbinfo',
    headers: {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xml)
    },
    key: fs.readFileSync('./gn/cert/apiclient_key.pem'),
    cert: fs.readFileSync('./gn/cert/apiclient_cert.pem'),
    agent: false
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
      xml2js.parseString(buff.toString(), {
        explicitArray: false,
      }, function (err, result) {
        console.log(result);
        if (result.xml.return_code == "SUCCESS" && result.xml.result_code == "SUCCESS") {
          let obj = reqData;
          obj.get_time = new Date().getTime();
          // co(function* () {
          //   yield common.toPromise(wechatDao.setWechatPayInfo, obj);
          //   resp.send({ state: 1, data: { code_url: result.xml.code_url } });
          // }).catch(function (e) {
          //   resp.send({ state: 0, err: e });
          // });
          resp.send({ state: 0,status:result.xml.status})
        } else {
          resp.send({ state: 0, err: { err_code: result.xml.err_code, err_code_des: result.xml.err_code_des } });
        }
      });
    })
  })
  post_req.on('error', function (err) {
    console.log('异常,异常原因:' + err);
    resp.send({ state: 0, err: err });
  })
  post_req.write(xml);
  post_req.end();
});

function generateRandomAlphaNum(len) {
  var rdmString = "";
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len);
}


module.exports = router;
