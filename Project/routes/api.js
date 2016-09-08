//用户api
var _ = require('lodash');

module.exports = function(db) {
	var workHandler = require('../models/workHandler.js')(db);

	var api = {
		// get all homeworks
		homeworks: function(req, res) {
			var username = req.session.user.username;
			var homeworks = [];
			var flag = false;
			workHandler.getAllHomeworks({username: 'TA'})
			.then(function(allHomeworks) {
				workHandler.getAllHomeworks({username: username})
				.then(function(Homeworks) {
					allHomeworks.forEach(function(homework, i) {
						Homeworks.forEach(function(_homework, _i) {
							if (homework.homeworkId == _homework.homeworkId) {
								homeworks.push({
									id: i,
									homeworkId: homework.homeworkId,
									title: homework.title,
									username: username,
									filePath: _homework.filePath.slice(8),
									photoPath: _homework.photoPath.slice(8),
									comments: _homework.comments,
									TAcomment: _homework.TAcomment,
									point: _homework.point,
									link: _homework.link
								});
								flag = true;
							}
						});
						if (flag == true) {
							flag = false;
						} else {
							homeworks.push({
								id: i,
								homeworkId: homework.homeworkId,
								title: homework.title,
								username: username,
								photoPath: '../images/homework.png',
								comments: homework.comments,
								TAcomment: homework.TAcomment,
								point: homework.point,
								link: homework.link
							});	
						}
					});
					res.json({
						homeworks: homeworks
					});
				});
			});
		},

		read: function(req, res) {
			var comments = [];
			var TAcomment = {};
			var homeworkId = req.params.homeworkId;
			var username = req.session.user.username;
			workHandler.getOneHomework(username, homeworkId)
			.then(function(homework) {
				comments = homework.comments;
				TAcomment = homework.TAcomment;
				res.json({
					comments: comments,
					TAcomment: TAcomment
				});
			});
		},

		readOthers: function(req, res) {
			var homeworks = [];
			var homeworkId = req.params.homeworkId;
			var username = req.session.user.username;
			workHandler.getAllHomeworks({homeworkId:homeworkId, isStudent:true})
			.then(function(allHomeworks) {
				homeworks = _.filter(allHomeworks, function(homework) {
					return homework.username != username;
				});
				homeworks.forEach(function(homework) {
					homework.photoPath = homework.photoPath.slice(8);
					homework.filePath = homework.filePath.slice(8);
				});
				res.json({
					homeworks: homeworks
				});
			});
		},

		submit: function(req, res) {
			
		},

		assign: function(req, res) {
			var username = req.session.user.username;
			var homework = req.body;
			workHandler.getAllHomeworks({username: 'TA'})
			.then(function(allHomeworks) {
				homework.homeworkId = allHomeworks.length;
				homework.username = 'TA';
				homework.isStudent = false;
				homework.photoPath = './public/images/homework.png';
				workHandler.taHomework(homework);
				res.json({
					username: username
				});
			});
		},

		view: function(req, res) {
			var homeworks = [];
			var homeworkId = req.params.homeworkId;
			workHandler.getAllHomeworks({isStudent: true, homeworkId: homeworkId})
			.then(function(allHomeworks) {
				homeworks = allHomeworks;
				homeworks.forEach(function(homework) {
					homework.photoPath = homework.photoPath.slice(8);
					homework.filePath = homework.filePath.slice(8);
				});
				res.json({
					homeworks: homeworks
				});
			});
		},

		rank: function(req, res) {
			var homeworks = [];
			var homeworkId = req.params.homeworkId;
			workHandler.getAllHomeworks({homeworkId:homeworkId, isStudent:true})
			.then(function(allHomeworks) {
				var _homeworks = _.filter(allHomeworks, function(homework) {
					return homework.TAcomment.point == '暂无成绩';
				});
				var __homeworks = _.filter(allHomeworks, function(homework) {
					return homework.TAcomment.point != '暂无成绩';
				});
				homeworks = _.sortByOrder(__homeworks, function(homework) {
					return homework.TAcomment.point;
				}, ['desc']);

				homeworks = _(homeworks).concat(_homeworks);
				res.json({
					homeworks: homeworks
				});
			});
		},

		judge: function(req, res) {
			var homework = {};
			var homeworkId = req.params.homeworkId;
			var username = req.params.username;
			var user = req.session.user;
			workHandler.getOneHomework(username, homeworkId)
			.then(function(_homework) {
				homework = _homework;
				res.json({
					homework: homework,
					user: user
				}).catch(function(err) {
					console.log(err);
				});
			});
		},

		userComment: function(req, res) {
			var comment = {};
			var homeworkId = req.params.homeworkId;
			var username = req.params.username;
			var curUsername = req.session.user.username;
			workHandler.getOneHomework(username, homeworkId)
			.then(function(_homework) {
				comment = _.filter(_homework.comments, function(_comment) {
					return _comment.username == curUsername;
				});
				res.json({
					comment: comment
				});
			});
		},

		commentSubmit: function(req, res) {
			var comments = [];
			var comment = req.body;
			var homeworkId = req.params.homeworkId;
			var username = req.params.username;
			var curUsername = req.session.user.username;
			comment.username = curUsername;
			workHandler.getOneHomework(username, homeworkId)
			.then(function(homework) {
				comments = _.filter(homework.comments, function(_comment) {
					return _comment.username != curUsername;
				});
				comments.push(comment);
				workHandler.updateComments(username, homeworkId, comments)
				.then(function() {
					res.json(true);
				});
			});
		},

		judgeSubmit: function(req, res) {
			var homeworkId = req.params.homeworkId;
			var username = req.params.username;
			var TAcomment = req.body;
			var user = req.session.user;
			workHandler.updateTAComment(username, homeworkId, TAcomment)
			.then(function() {
				res.json(true);
			}).catch(function(err) {
				console.log(err);
			});
		},

		ta: function(req, res) {
			var homeworks = [];
			workHandler.getAllHomeworks({username: 'TA'})
			.then(function(allHomeworks) {
				homeworks = allHomeworks;
				res.json({
					homeworks: homeworks
				});
			});
		}
	}

	return api;
}