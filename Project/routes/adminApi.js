//管理员api

module.exports = function(db) {

	var userHandler = require('../models/userHandler.js')(db);

	var adminApi = {

		users: function(req, res) {
			console.log("users?");
			var users = [];
			userHandler.getAllUsers()
			.then(function(users) {
				users = users;
				res.json({
					users: users
				});
			});
		},

		addUser: function(req, res) {
			var msg = "";
			var user = req.body;
			userHandler.checkUser(user)
			.then(function() {
				userHandler.userRegist(user);
				msg = "添加成功！";
				res.json(msg);
			}).catch(function(err) {
				console.log(err);
				msg = err;
				res.json(msg);
			});
		},

		deleteUser: function(req, res) {
			var user = req.body;
			var msg = "";

			userHandler.deleteUser(user.username).then(function() {
				msg = "删除成功！";
				res.json(msg);
			}).catch(function() {
				msg = "该用户不存在！";
				res.json(msg);
			});
		}
	}
	return adminApi;
}