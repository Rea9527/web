var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var qs = require('querystring');
var validator = require('./validator.js');


var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));
app.use(cookieParser());

app.get('/regist', function(req, res) {
	console.log('Cookies:', req.cookies);
	res.sendFile(__dirname+'/signin.html');
});

app.post('/', urlencodedParser, function(req, res) {
	userInfor = {
       username:req.body.username,
       password:req.body.password,
       studentId:req.body.studentId,
       phone:req.body.phone,
       email:req.body.email
  	};
  	userInfor = JSON.stringify(userInfor);
  	console.log(userInfor);
	res.end(userInfor);
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log(host+':'+port);
});