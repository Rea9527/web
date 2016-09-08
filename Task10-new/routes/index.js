var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator.js');


module.exports = function(db) {
	var userHandler = require('../models/userHandler.js')(db);
	//visit by ?username=
	router.get('/', function(req, res, next) {
		console.log(req.path);
		if (req.session.user) {
			if (req.session.user.username&&req.query.username) {
				var user = req.session.user;
				res.render('detail', {title:'Detail', user:user, tip:'只能够访问自己的数据'});
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
			res.redirect('/detail');			
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
			res.redirect('/detail');			
		}).catch(function(err) {
			res.render('signup', {title:'Signin', user:user, error:err});
		});
	});
	//用户详情
	router.get('/detail', function(req, res, next) {
	  res.render('detail', { title: 'Detail', user: req.session.user, tip:""});
	});

	return router;
}

