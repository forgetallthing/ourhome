var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var schedule = require("node-schedule");
var https = require("https");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

schedule.scheduleJob('30 * * * * *', function () {
  console.log('scheduleCronstyle:' + new Date());
  const access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx986fbde73494c321&secret=51dd60cf87edc438b11e240cb88070d9";
  https.get(access_token_url, function (res) {
    var datas = [];
    var size = 0;
    res.on('data', function (data) {
      datas.push(data);
      size += data.length;
      //process.stdout.write(data);  
    });
    res.on("end", function () {
      var buff = Buffer.concat(datas, size);
      var result = buff.toString(); 
      console.log(result);
    });
  }).on("error", function (err) {
    console.log(err)
  });
});

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
