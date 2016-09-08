var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator.js');


module.exports = function(db) {
	var userHandler = require('../models/userHandler.js')(db);
	//visit by ?username=
	router.get('/', function(req, res, next) {
		console.log("path", req.path, "bin");
		if (req.session.user) {
			if (req.session.user.username&&req.query.username) {
				var user = req.session.user;
				res.render('blog/blog', {title:'Blog', user:user});
			} else if (req.path == '/') {
				res.redirect('signin');
			} else {
				res.render('error');
			}
		} else if (req.path == '/') {
			res.redirect('signin');
		} else {
			res.render('error');
		}
	});
	/* GET home page. */
	router.get('/signin', function(req, res, next) {
		res.render('signin', {title: 'SignIn', error:""});
	});
	// 登录
	router.post('/signin', function(req, res, next) {
		var user = req.body;
		userHandler.checkRegist(user.username, user.password)
		.catch(function(err) {
			res.render('signin', {title:'SignIn', error:err});
		}).then(userHandler.getUser(user.username).then(function(myUser) {
			req.session.user = myUser;
			console.log("post??");
			res.redirect('/index');
		}));
	});

	//退出登录
	router.post('/signout', function(req, res, next) {
		delete req.session.user;
		res.redirect('/signin');
	});
	//注册
	router.get('/regist', function(req, res, next) {
	  res.render('signup', { title: 'Signup', user:{}, error: ""});
	});
	//注册post请求处理
	router.post('/regist', function(req, res, next) {
		var user = req.body;
		userHandler.checkUser(user)
		.then(function() {
			userHandler.userRegist(user);
			//注册成功将User存入session
			req.session.user = user;
			res.render('blog/blog', { title: 'Blog', user: user});		
		}).catch(function(err) {
			res.render('signup', {title:'Signin', user:user, error:err});
		});
	});
	//用户详情
	router.post('/index', function(req, res, next) {
		var user = req.body;
		userHandler.checkRegist(user.username, user.password)
		.catch(function(err) {
			res.render('signin', {title:'SignIn', error:err});
		}).then(userHandler.getUser(user.username).then(function(myUser) {
			req.session.user = myUser;
			res.render('blog/blog', { title: 'Blog', user: user});
		}));
	});

	router.get('/Blog/index', function(req, res, next) {
		res.render('blog/blog', {title: 'Blog', user: req.session.user});
	});

	router.get('/addPost', function(req, res, next) {
		res.render('blog/blog', {title: 'Blog', user: req.session.user});
	});

	router.get('/admin/readPost/*', function(req, res, next) {
		res.render('blog/blog', {title: 'Blog', user: req.session.user});
	});

	router.get('/readPost/*', function(req, res, next) {
		res.render('blog/blog', {title: 'Blog', user: req.session.user});
	});

	router.get('/editPost/*', function(req, res, next) {
		res.render('blog/blog', {title: 'Blog', user: req.session.user});
	});

	router.get('/myPosts', function(req, res, next) {
		res.render('blog/blog', {title: 'Blog', user: req.session.user});
	});

	router.get('/deletePost/*', function(req, res, next) {
		res.render('blog/blog', {title: 'Blog', user: req.session.user});
	});

	router.get('/blog/partials/*', function(req, res, next) {
		var name = req.params[0];
  		res.render('blog/partials/'+name);
	});

	return router;
}

