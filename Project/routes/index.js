
var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator.js');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');


module.exports = function(db) {
	var userHandler = require('../models/userHandler.js')(db);
	var workHandler = require('../models/workHandler.js')(db);

	//
	router.get('/', function(req, res, next) {
		if (req.session.user) {
			if (req.session.user.username&&req.query.username) {
				var user = req.session.user;
				res.render('index/index', {title:'myAchievements', user:user});
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
		if (user.username == 'admin'&&user.password == 'admin') {
			var newUser = {};
			newUser.username = 'Admin';
			newUser.password = 'youdontknow';
			req.session.user = newUser;
			res.redirect('/admin');
		} else if (user.username == 'teacher'&&user.password == 'teacher') {
			var newUser = {};
			newUser.username = 'teacher';
			newUser.password = 'youdontknow';
			req.session.user = newUser;
			res.redirect('/teacher');
		} else if (user.username == 'teacherass'&&user.password == 'teacherass') {
			var newUser = {};
			newUser.username = 'ta';
			newUser.password = 'youdontknow';
			req.session.user = newUser;
			res.redirect('/ta');
		} else {
			userHandler.checkRegist(user.username, user.password)
			.catch(function(err) {
				res.render('signin', {title:'SignIn', error:err});
			}).then(userHandler.getUser(user.username).then(function(myUser) {
				req.session.user = myUser;
				res.redirect('/myAchievements');
			}));		
		}

	});

	//学生登陆
	router.get('/myAchievements', function(req, res, next) {
	    res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//教师登陆
	router.get('/teacher', function(req, res, next) {
	    res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//ta登陆
	router.get('/ta', function(req, res, next) {
	    res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//管理员登陆
	router.get('/admin', function(req, res, next) {
		console.log('admin?');
		res.render('admin/index', {title: 'myAchievements', user: req.session.user});
	});
	//学生提交作业
	router.get('/submit/*', function(req, res, next) {
		res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//学生查看其他同学对自己作业的评审
	router.get('/read/*', function(req, res, next) {
		res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//TA和老师查看排名
	router.get('/rank/*', function(req, res, next) {
		res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//TA和老师查看作业情况
	router.get('/view/*', function(req, res, next) {
		res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//TA和老师评审作业
	router.get('/judge/*', function(req, res, next) {
		res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//评审其他学生作业
	router.get('/userComment/*', function(req, res, next) {
		res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//查看其他学生作业
	router.get('/readOthers/*', function(req, res, next) {
		res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//布置作业
	router.get('/homework', function(req, res, next) {
		res.render('index/index', { title: 'myAchievements', user: req.session.user});
	});
	//增加用户
	router.get('/addUser', function(req, res, next) {
		res.render('admin/index', {title: 'myAchievements'});
	});
	//删除用户
	router.get('/deleteUser', function(req, res, next) {
		res.render('admin/index', {title: 'myAchievements'});
	});
	//文件上传
	router.post('/files/uploadFiles/:homeworkId', function(req, res, next) {
		var homeworkId = req.params.homeworkId;
		var username = req.session.user.username;
		//创建作业目录
		fs.mkdir('./public/files/'+homeworkId, function(err) {
			if (err) {
				console.log("create homework file err:", err);
			} else {
				console.log("create homework file successfully!");
			}
		});
		//	递归删除文件(该方法来自google)
		var rmdirSync = (function(){
	        function iterator(url,dirs){
	            var stat = fs.statSync(url);
	            if(stat.isDirectory()){
	                dirs.unshift(url);//收集目录
	                inner(url,dirs);
	            }else if(stat.isFile()){
	                fs.unlinkSync(url);//直接删除文件
	            }
	        }
	        function inner(path,dirs){
	            var arr = fs.readdirSync(path);
	            for(var i = 0, el ; el = arr[i++];){
	                iterator(path+"/"+el,dirs);
	            }
	        }
	        return function(dir,cb){
	            cb = cb || function(){};
	            var dirs = [];
	     
	            try{
	                iterator(dir,dirs);
	                for(var i = 0, el ; el = dirs[i++];){
	                    fs.rmdirSync(el);//一次性删除所有收集到的目录
	                }
	                cb()
	            }catch(e){//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
	                e.code === "ENOENT" ? cb() : cb(e);
	            }
	        }
	    })();
	    //判断作业目录是否存在
		fs.exists('./public/files/'+homeworkId, function(exist) {
			rmdirSync('./public/files/'+homeworkId+'/'+username, function(err) {
				console.log('rmdir',err);
			});

			fs.mkdir('./public/files/'+homeworkId+'/'+username, function(err) {
				if (err) {
					console.log('create err:', err);
				} else {
					console.log('create success!!');
				}
			});
		});

	    //生成multiparty对象，并配置上传目标路径
	    var form = new multiparty.Form({uploadDir: './public/files/'});
	    //上传完成后处理
	    form.parse(req, function(err, fields, files) {
	        var filesTmp = JSON.stringify(files,null);
	        if(err){
	            console.log('parse error: ' + err);
	        } else {
			    var userFile = files.userFile[0];
				var userPhoto = files.userPhoto[0];
				var photoPath = userPhoto.path;
			    var filePath = userFile.path;
				console.log("userFile.originalFilename:"+userFile.originalFilename);
			    var newFilePath = './public/files/'+homeworkId+'/'+username+'/'+userFile.originalFilename;
				var newPhotoPath = './public/files/'+homeworkId+'/'+username+'/'+userPhoto.originalFilename;
				var homework = {};
				homework.filePath = newFilePath;
				homework.photoPath = newPhotoPath;
				homework.comments = {};
				homework.username = username;
				homework.isStudent = true;
				homework.homeworkId = homeworkId;
				homework.TAcomment = {point: "暂无成绩"};
				workHandler.getOneHomework({username:'TA', homeworkId:homeworkId})
				.then(function(_homework) {
					homework.link = _homework.link;
					workHandler.deleteHomework(homework)
					.then(function() {
						workHandler.taHomework(homework)
						.then(function() {
							console.log('upload success!');
						});
					});
				})

				//重命名文件
	            fs.rename(filePath, newFilePath, function(err) {
	            	if(err){
	                	console.log('rename error: ' + err);
	                } else {
	                	console.log('rename ok');
	                }
	            });

	            fs.rename(photoPath, newPhotoPath, function(err) {
	            	if(err){
	                	console.log('rename error: ' + err);
	                } else {
	                	console.log('rename ok');
	                }
	            });
	        }
			res.render('index/index', { title: 'myAchievements', user: req.session.user});
		});
	});

	router.get('/index/partials/*', function(req, res, next) {
	  	var name = req.params[0];
  		res.render('index/partials/'+name);
	});

	router.get('/admin/partials/*', function(req, res, next) {
		var name = req.params[0];
		res.render('admin/partials/'+name);
	});

	return router;
}

