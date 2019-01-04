const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const schedule = require("node-schedule");
const https = require("https");
const Config = require("./common/config.js")

const indexRouter = require('./routes/index');
const app = express();

const MongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://" + Config.DB_USER + ":" + Config.DB_PW + "@" + Config.sys_mongo;
const routerMap = require("./routes/router");

MongoClient.connect(mongoUrl, { authSource: "admin", useNewUrlParser: true, autoReconnect: true, connectTimeoutMS: 3600000, socketTimeoutMS: 3600000, wtimeout: 0 }, function (err, client) {
  if (err) throw err;
  const db = client.db(Config.mongo_db);
  global.mongodb = db;
  console.log("mongodb连接成功")
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
routerMap.forEach(v => {
  app.use("/" + v.path, v.r);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  if (err.status == 404) {
    res.render('404/404.html');
  } else {
    res.send("服务器500岁啦~");
  }
});

module.exports = app;
