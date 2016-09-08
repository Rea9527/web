var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


module.exports = function(db) {
  var routes = require('./routes/index')(db);
  var app = express();
  var api = require('./routes/api')(db);

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
  app.use(session({
      store: new FileStore(),
      resave: false,
      secret: 'Rea',
      saveUninitialized: false,
      cookie: {maxAge: 600000}
    }));


  app.use('/', routes);

  // // Routes

  // app.get('/index', routesIndex.index);
  // app.get('/partials/:name', routesIndex.partials);

  // JSON API

  app.get('/api/posts', api.posts);
  app.get('/api/myPosts', api.myPosts);
  app.get('/api/isAdmin', api.isAdmin);
  app.get('/api/post/:id', api.post);
  app.post('/api/post', api.addPost);
  app.post('/api/comment/:id', api.addComment);
  app.post('/api/deleteComment/:id', api.deleteComment);
  app.post('/api/hideComment/:id', api.hideComment);
  app.post('/api/showComment/:id', api.showComment);
  app.get('/api/hidePost/:id', api.hidePost);
  app.get('/api/showPost/:id', api.showPost);
  app.put('/api/post/:id', api.editPost);
  app.delete('/api/post/:id', api.deletePost);

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


