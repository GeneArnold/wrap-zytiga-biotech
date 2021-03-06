var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var knexLogger = require('knex-logger');
var json2csv = require('nice-json2csv');

var services = require('./services');
var knex = services.knex;

require('dotenv').config({silent: true});

var app = express();

app.use(json2csv.expressDecorator);

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// User for loggin knex queries, used only in development
// if (app.get('env') === 'development') {
//   app.use(knexLogger(knex));
// }

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'server/public')));

// CORS access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Setup routes
require('./routes')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    if (req.accepts('html','json') === 'json') {
      res.json({
        message: err.message,
        error: err
      });
    } else {
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    };
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  if (req.accepts('html','json') === 'json') {
    res.json({
      message: err.message,
      error: {}
    });
  } else {
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  }
});


module.exports = app;
