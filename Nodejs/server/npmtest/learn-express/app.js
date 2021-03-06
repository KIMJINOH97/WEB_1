var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup  app.set : 익스프레스 설정 또는 값 저장
// app.use : 미들웨어 장착 use안의 값들 = 미들웨어 << express의 핵심
// 요청(req) -> 미들웨어들(app.use) 거쳐 -> 응답(res) 매커니즘 형식
// get, post 등이 없음
// app.use 안의 req, res로 요청과 응답을 조작 할 수 있음, next로 다음 미들웨어로 넘어감
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // pug는 html을 대체하는 것을 view에 장착해줌

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
    res.render('error');
});

module.exports = app;
