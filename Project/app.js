var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(db) {
  var routes = require('./routes/index')(db);
  var app = express();
  var api = require('./routes/api')(db);
  var adminApi = require('./routes/adminApi')(db);

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(__dirname + "/files"));
  app.use(session({
      store: new FileStore(),
      secret: 'Rea',
      resave: false,
      saveUninitialized: false
    }));


  app.use('/', routes);

  app.get('/api/homeworks', api.homeworks);
  app.get('/api/read/:homeworkId', api.read);
  app.get('/api/readOthers/:homeworkId', api.readOthers);
  app.get('/api/view/:homeworkId', api.view);
  app.get('/api/rank/:homeworkId', api.rank);
  app.get('/api/judge/:homeworkId/:username', api.judge);
  app.get('/api/userComment/:homeworkId/:username', api.userComment);
  app.post('/api/commentSubmit/:homeworkId/:username', api.commentSubmit);
  app.post('/api/judgeSubmit/:homeworkId/:username', api.judgeSubmit);
  app.post('/api/submit/:homeworkId', api.submit);
  app.post('/api/assign', api.assign);
  app.get('/api/ta', api.ta);
  app.get('/adminApi/users', adminApi.users);
  app.post('/adminApi/addUser', adminApi.addUser);
  app.post('/adminApi/deleteUser', adminApi.deleteUser);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  return app;
}


