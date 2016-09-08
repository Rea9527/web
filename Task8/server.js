var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring')
//判断新注册用户是否已存在
function checkExist(stream, data) {
	for (var tmp in stream) {
		if (stream[tmp].username == data.username) return 'nameExist';
		if (stream[tmp].studentId == data.studentId) return 'idExist';
		if (stream[tmp].phone == data.phone) return 'phoneExist';
		if (stream[tmp].email == data.email) return 'emailExist';
	}
	return 'false';
}
//判断注册信息格式，若合法则进行存入处理，反之则返回相应错误信息
function check(data) {
	var exp = /^[a-zA-z0-9_\-]+@(([a-zA-z0-9_\-])+\.)+[a-zA-z]{2,4}$/;
	username = data.username.match(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/);
	studentId = data.studentId.match(/^[1-9][0-9]{7}$/);
	phone = data.phone.match(/^[1-9][0-9]{10}$/);
	email = data.email.match(/^[a-zA-z0-9_\-]+@(([a-zA-z0-9_\-])+\.)+[a-zA-z]{2,4}$/);
	if (username == null) return 'usernameWrong';
	if (studentId == null) return 'idWrong';
	if (phone == null) return 'phoneWrong';
	if (email == null) return 'emailWrong';
	var stream = fs.readFileSync('data.json');
	if (stream.toString()) {
		stream = JSON.parse(stream);
		console.log(stream);
		var result = checkExist(stream, data);
		if (result != 'false') return result;
		stream[data.username] = data;
		fs.writeFileSync('data.json', JSON.stringify(stream));
	} else {
		var _stream = {};
		_stream[data.username] = data;
		fs.writeFileSync('data.json', JSON.stringify(_stream));
	}
	return 'true';
}

//通过?username=访问时 判断是否存在该用户
function userVisit(name) {
	var stream = fs.readFileSync('data.json');
	var _data;
	if (stream.toString()) {
		stream = JSON.parse(stream);
		for (var t in stream) if (stream[t].username == name) return stream[t];
		return '';
	} else {
		return '';
	}
}

//用户详情显示
function newHtml(_data) {
	return '<p>username: '+_data.username+'</p><p>StudentId: '+_data.studentId+'</p><p>Phone: '+_data.phone+'</p><p>Email: '+_data.email+'</p>';
}

//错误提示
function wrongAlert(wrong) {
	var alert = '';
	if (wrong == 'idWrong') alert = '学号8位数字，不能以0开头';
	else if (wrong == 'usernameWrong') alert = '用户名6~18位英文字母、数字或下划线';
	else if (wrong == 'phoneWrong') alert = '电话11位数字，不能以0开头';
	else if (wrong == 'emailWrong') alert = '邮箱格式不符';
	else if (wrong == 'nameExist') alert = '用户名已存在';
	else if (wrong == 'idExist') alert = '学号已存在';
	else if (wrong == 'phoneExist') alert = '电话已存在';
	else if (wrong == 'emailExist') alert = '邮箱已存在';
	return alert;
}

function onRequest(req, res) {
	var pathname = url.parse(req.url).pathname;
	var _path = path.basename(pathname);
	if (req.url.indexOf('?username=') != -1) _path = req.url;

 	var s = './';
 			//对请求进行判断
    		switch(_path) {
    			case 'signin.css':
    				res.writeHead(200, {'Content-Type': 'text/css'});
    				s += 'css/signin.css';
    				break;
    			case 'signin.js':
    				res.writeHead(200, {'Content-Type': 'text/javascript'});
    				s += 'js/signin.js';
    				break;
    			case 'favicon.png':
    				res.writeHead(200, {'Content-Type': 'image/png'});
    				s += 'img/favicon.png';
    				break;
    			case 'user.css':
    				res.writeHead(200, {'Content-Type': 'text/css'});
    				s += 'css/user.css';
    				break;
    			case 'bg.png':
    				res.writeHead(200, {'Content-Type': 'image/png'});
    				s += 'img/bg.png';
    				break;
    			case 'bg2.jpg':
    				res.writeHead(200, {'Content-Type': 'image/jpg'});
    				s += 'img/bg2.jpg';
    				break;
    			case 'bg3.jpg':
    				res.writeHead(200, {'Content-Type': 'image/jpg'});
    				s += 'img/bg3.jpg';
    				break;
    			case req.url:
    				res.writeHead(200, {'Content-Type': 'text/html'});
    				s = '.'+_path;
    				break;
    			default:
    				res.writeHead(200, {'Content-Type': 'text/html'});
    				s += 'signin.html'
    		}
    		//以下为对请求的处理
    		//对css和js的处理
    		if (s.indexOf('.png') == -1&&s.indexOf('.jpg') == -1&&s.indexOf('signin.html') == -1&&s.indexOf(req.url) == -1) {
    			fs.readFile(s, function(err, data) {
	    			if (err) console.error(err);
	    			res.end(data);
    			});
    		//对注册页面访问的处理
    		} else if (s == './signin.html') {
    			var infor = '';
    			req.on('data', function(inforData) {
    				infor += inforData;
    				infor = qs.parse(infor);
    				console.log(infor);
    			});
    			req.on('end', function() {
    				//当所填注册信息不为空
    				if (infor != '') {
    					//当注册信息符合要求 写入新用户 并跳转
	    				if (check(infor) == 'true') {
		    				fs.readFile('./user.html', function(err, data) {
			    				if (err) console.error(err);
			    				var str = newHtml(infor);
			    				data = data.toString();
			    				data = data.replace('<h2>Information Detail</h2>', '<h2>注册成功</h2>');
			    				data = data.replace('UserInfor', str);
				    			res.write(data);
				    			res.end();
			    			});
			    		//当注册信息不符合要求 错误提示
		    			} else {
		    				var wrong = check(infor);
		    				var alert = wrongAlert(wrong);
		    				fs.readFile('./signin.html', function(err, data) {
			    				if (err) console.error(err);
			    				data = data.toString();
			    				data = data.replace('<div id=\"alert\"></div>', '<div id=\"alert\">'+alert+'</div>');
				    			res.write(data);
				    			res.end();
			    			});
		    			}
		    		//当所填信息为空 重新加载当前页面  					
    				} else {
    					fs.readFile('./signin.html', function(err, data) {
    						if (err) console.error(err);
    						res.write(data);
    						res.end();
    					});
    				}
    			});
			//通过Url访问用户信息的处理
    		} else if (s == '.'+_path) {
    			var name = s.slice(s.indexOf('=')+1);
    			console.log(name);
    			var _data = userVisit(name);
    			//不存在该用户则跳至注册页面
    			if (_data == '') {
    				fs.readFile('./signin.html', function(err, data) {
			    				if (err) console.error(err);
				    			res.write(data);
				    			res.end();
			    	});
			    //存在该用户则跳转至用户信息页面
    			} else {
    				fs.readFile('./user.html', function(err, data) {
			    		if (err) console.error(err);
			    		var str = newHtml(_data);
			    		data = data.toString();
			    		data = data.replace('UserInfor', str);
				    	res.write(data);
				    	res.end();
			    	});
    			}
    		//对图片的访问请求处理
    		} else {
    			fs.readFile(s, 'binary', function(err, data) {
	    			if (err) console.error(err);
	    			res.end(data, 'binary');
    			});
    		}

}

http.createServer(onRequest).listen(8000);
