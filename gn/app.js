var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var schedule = require("node-schedule");
var https = require("https");
var Config = require("./common/config.js")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wechatRouter = require('./routes/wechatRouter');

var app = express();

const MongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://" + Config.DB_USER + ":" + Config.DB_PW + "@" + Config.sys_mongo;

MongoClient.connect(mongoUrl, { authSource: "admin", useNewUrlParser: true, autoReconnect: true, connectTimeoutMS: 3600000, socketTimeoutMS: 3600000, wtimeout: 0 }, function (err, client) {
  if (err) throw err;
  const db = client.db(Config.mongo_db);
  global.mongodb = db;
  console.log("mongodb链接成功")
  //添加全局toObjectID方法
  const ObjectID = require("mongodb").ObjectID;
  global.toObjectID = function (id) {
    if (typeof (id) == "string") {
      return ObjectID(id);
    }
    return id;
  }
});

//日志
MongoClient.connect(mongoUrl, { authSource: "admin", useNewUrlParser: true, connectTimeoutMS: 3600000, socketTimeoutMS: 3600000, wtimeout: 0 }, function (err, client) {
  if (err) throw err;
  const db = client.db(Config.log_db);
  global.logdb = db;
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', ejs.__express);
app.set('view engine', 'html');//设置视图引擎

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wechatRo', wechatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//每小时一次获取access_token
schedule.scheduleJob('0 0 * * * *', function () {
  console.log('scheduleCronstyle:' + new Date());
  get_access_token()
});

function get_access_token() {
  const access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx986fbde73494c321&secret=51dd60cf87edc438b11e240cb88070d9";
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
      if (result.access_token) {
        global.access_token = result.access_token;
      }
      console.log(global.access_token);
    });
  }).on("error", function (err) {
    console.log(err)
  });
}

get_access_token()


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
