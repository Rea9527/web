//这么少代码  就不用jquery了吧- -

window.onload = function() {
	message = document.getElementsByClassName('wrong');
	var input = document.getElementsByTagName('input');
	for (var i = 0; i < input.length; i++) {
		input[i].onblur = blurCheck;
		input[i].onfocus = focusCheck;
	}

	var form = document.getElementById('form');
	form.onsubmit = formSubmit;


}

function blurCheck(event) {
	var str = event.target.value;
	var name = event.target.name;
	if (name == 'username') {
		if (str.match(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/) == null) {
			message[0].textContent = '用户名6~18位英文字母、数字或下划线';
		}
	} else if (name == 'studentId') {
		if (str.match(/^[1-9][0-9]{7}$/) == null) {
			message[2].textContent = '学号8位数字，不能以0开头';
		}		
	} else if (name == 'phone') {
		if (str.match(/^[1-9][0-9]{10}$/) == null) {
			message[3].textContent = '电话11位数字，不能以0开头';
		}
	} else if (name == 'email') {
		if (str.match(/^[a-zA-z0-9_\-]+@(([a-zA-z0-9_\-])+\.)+[a-zA-z]{2,4}$/) == null) {
			message[4].textContent = '邮箱格式不符';
		}
	} else if (name == 'password') {
		if (str.match(/^[a-zA-z0-9_\-]{6,12}$/) == null) {
			message[1].textContent = '密码6~12位英文字母、数字或下划线';
		}
	}
}

function focusCheck(event) {
	var name = event.target.name;
	if (name == 'username') message[0].textContent = '';
	else if (name == 'password') message[1].textContent = '';
	else if (name == 'studentId') message[2].textContent = '';
	else if (name == 'phone') message[3].textContent = '';
	else if (name == 'email') message[4].textContent = '';
}

function formSubmit() {
	if (message[0].textContent != ''||message[1].textContent != ''||message[2].textContent != ''||message[3].textContent != ''||message[4].textContent != '')
	return false;
}