var crypto = require('crypto');
var validator = require('../public/javascripts/validator.js');
var _ = require('lodash');

module.exports = function(db) {
	var users = db.collection('users');

	var userHandler = {
		//从数据库获取一个user信息
		getUser: function(username) {
			return users.findOne({username: username}).then(function(user) {
				return user;
			});
		},
		//判断user的合法性 唯一性
		checkUser: function(user) {
			var err;
			for (var key in user) {
				if (user.hasOwnProperty(key)) {
					if (!validator.isFieldValid(key, user[key])) {
						err = validator.getErrorMessage(key);
						break;
					}
				}
			}
			return new Promise(function(resolve, reject) {
				err ? reject('您的注册信息不完整！'):resolve();
			}).then(function() {
				return users.findOne(checkAttr(user))
				.then(function(existedUser) {
					if (existedUser == null) return Promise.resolve(user);
					if (existedUser.username == user.username) return Promise.reject(validator.getExistMessage('username'));
					else if (existedUser.studentId == user.studentId) return Promise.reject(validator.getExistMessage('studentId'));
					else if (existedUser.phone == user.phone) return Promise.reject(validator.getExistMessage('Phone'));
					else if (existedUser.email == user.email) return Promise.reject(validator.getExistMessage('Email'));
					else return Promise.resolve(user);
				});
			});
		},
		//登录信息判断
		checkRegist: function(username, password) {
			return (users.findOne({username: username})).then(function(user) {
				if (user == null) return Promise.reject('用户名或密码错误！');
				if (user.username) {
					if (user.password == crypto.createHash('md5').update(password).digest('hex')) return Promise.resolve();
					else return Promise.reject('用户名或密码错误！');
				}
			});
		},
		//注册一个新用户
		userRegist: function(user) {
			user.password = crypto.createHash('md5').update(user.password).digest('hex');
			return users.insert(user);
		}
	}
	return userHandler;
}

function checkAttr(user) {
	return {
		$or: _(user).omit('password').pairs().map(toObject).value()
	}
} 

function toObject(pair) {
	obj = {};
	obj[pair[0]] = pair[1];
	return obj;
}
