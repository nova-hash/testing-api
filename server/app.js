var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var userRouter = require('./routes/api_user');
// var adminRouter = require('./routes/api_admin');
var resellerRouter = require('./routes/api_reseller');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { default: mongoose } = require('mongoose');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev')); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://cecyoursdevs:UzToo5BxF46IysLx@autosend.twhxbqv.mongodb.net/?retryWrites=true&w=majority").then(()=> { 
  console.log("connection Done");
}).catch((err) => {
  console.log(err);
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api_user', userRouter);
// app.use('/api_admin', adminRouter);
app.use('/api_reseller', resellerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message });
  res.render('error');
});

module.exports = app;
