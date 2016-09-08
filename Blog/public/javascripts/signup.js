$(window).ready(function() {
	$('.wrong').each(function() {
		$(this).text("").hide();
	});
	$('input:not(.button)').blur(blurCheck);
	$('input:not(.button)').focus(focusCheck);
	$('#submit').click(formSubmit);
	$('#reset').click(reset);
});
//光标移出
function blurCheck(event) {
	var value = event.target.value;
	var name = event.target.name;
	if (!validator.isFieldValid(name, value)) errorMsg('show', name);
	if (validator.isFieldValid(name, value)&&
		name == 'password'&&value == $('input').eq(2).val())
		$('#repeatWrong').text("").fadeOut();
}
//光标进入
function focusCheck(event) {
	errorMsg('hide', event.target.name);
}
//错误信息提示
function errorMsg(action, name) {
	var valida = {
		'username': 0,
		'password': 1,
		'repeatPassword': 2,
		'studentId': 3,
		'phone': 4,
		'email': 5
	}
	if (action == 'show') $('.wrong').eq(valida[name]).text(validator.getErrorMessage(name)).fadeIn();
	else $('.wrong').eq(valida[name]).text("").fadeOut();
}
//注册按钮点击
function formSubmit() {
	if ($('.wrong').eq(0).text() != ""||$('.wrong').eq(1).text() != ""||
		$('.wrong').eq(2).text() != ""||$('.wrong').eq(3).text() != ""||
		$('.wrong').eq(4).text() != ""||$('.wrong').eq(5).text() != "") return false;
}
//重置按钮点击
function reset() {
	for (var i = 0; i < 6; i++) {
		$('.wrong').eq(i).text("").hide();
		$('.input input').eq(i).attr('value', "");
	}
}