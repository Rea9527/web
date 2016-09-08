$(window).ready(function() {
	var orderCall = getRandom();
	var sum = 0;
	$('#button').hover(function() {}, function() {clearData(orderCall, sum);});
	//apb点击事件
	$('div .apb').click(function() {
		if ($('#order').html() == '') {
			var errorIndex = makeError();
			console.log(errorIndex);
			orderCall[0](orderCall, 0, sum, errorIndex);	
			showOrder(orderCall);
		}
	});
	//点击事件
	$('#control-ring li').click(function() {
		var cur = $(this);
		var index = parseInt($(this).index());
		if (cur.attr('class') == 'able') {
			var span = cur.find('span');
			span.attr('class', '');
			span.html('..');
		} else {
			return false;
		}
	});

});
//鼠标离开后 清零
function clearData(orderCall, sum) {
	$('#control-ring li').attr('class', 'able');
	$('#control-ring li span').attr('class', 'msg');
	$('#info-bar').html('<p></p>');
	$('#order').html('');
	$('#message').html('');
	orderCall = getRandom();
	sum = 0;
	$('div .apb').unbind('click');
	$('div .apb').click(function() {
		if ($('#order').html() == '') {
			var errorIndex = makeError();
			showOrder(orderCall);
			orderCall[0](orderCall, 0, sum, errorIndex);			
		}
	});
}
//产生随机顺序的0-4序列 并将对应的handler push并返回
function getRandom() {
	var num = [];
	var flag = [false,false,false,false,false];
	var data;
	for (var i = 0; i < 5; i++) {
		do {
			data = Math.round(Math.random()*4);
		} while (flag[data] == true);
		if (data == 0) num.push(aHandler);
		else if (data == 1) num.push(bHandler);
		else if (data == 2) num.push(cHandler);
		else if (data == 3) num.push(dHandler);
		else if (data == 4) num.push(eHandler);
		flag[data] = true;
	}
	return num;
}
//显示顺序
function showOrder(orderCall) {
	var a = [];
	for (var i = 0; i < 5; i++) {
		if (orderCall[i] == aHandler) a[i] = 0;
		else if (orderCall[i] == bHandler) a[i] = 1;
		else if (orderCall[i] == cHandler) a[i] = 2;
		else if (orderCall[i] == dHandler) a[i] = 3;
		else if (orderCall[i] == eHandler) a[i] = 4;
	}
	var dic = ['A','B','C','D','E'];
	var str = dic[a[0]]+'->'+dic[a[1]]+'->'+dic[a[2]]
				+'->'+dic[a[3]]+'->'+dic[a[4]];
	$('#order').html(str);
}

function aHandler(orderCall, index, currentSum, errorIndex) {
	if (errorIndex == 0) return {'msg': '这是个天大的秘密(否)', 'sum': currentSum};
	//发送异步请求
	$.ajax({
		type: 'get',
		url: '/',
		beforeSend: function() {$('#control-ring li').eq(0).trigger('click');},
		success: function(data, status) {
			console.log('aHandler success');
			show(0);
			currentSum += parseInt(data);
			$('#control-ring li').eq(0).find('span').html(data);
			$('#control-ring li').eq(0).attr('class', '');
			//调用下一个handler并处理异常
			if (index < 4) {
				var result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				while (result != undefined) {
					$('#message').html(result['msg']);
					errorIndex = makeError();			
					result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				}
			} else {
				var result = bubbleHandler(currentSum, errorIndex);
				while (result != undefined) {
					$('#message').html(result['msg']);
					errorIndex = makeError();
					result = bubbleHandler(currentSum, errorIndex);
				}
			}
		}
	});
}

function bHandler(orderCall, index, currentSum, errorIndex) {
	if (errorIndex == 1) return {'msg': '我不知道(否)', 'sum': currentSum};
	//发送异步请求
	$.ajax({
		type: 'get',
		url: '/',
		beforeSend: function() {$('#control-ring li').eq(1).trigger('click');},
		success: function(data, status) {
			console.log('bHandler success');
			show(1);
			currentSum += parseInt(data);
			$('#control-ring li').eq(1).find('span').html(data);
			$('#control-ring li').eq(1).attr('class', '');
			if (index < 4) {
				var result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				while (result != undefined) {
					$('#message').html(result['msg']);
					errorIndex = makeError();			
					result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				}
			} else {
				var result = bubbleHandler(currentSum, errorIndex);
				while (result != undefined) {
					errorIndex = makeError();
					result = bubbleHandler(currentSum, errorIndex);
				}
			}
		}
	});
}

function cHandler(orderCall, index, currentSum, errorIndex) {
	if (errorIndex == 2) return {'msg': '你不知道(否)', 'sum': currentSum};
	$.ajax({
		type: 'get',
		url: '/',
		beforeSend: function() {$('#control-ring li').eq(2).trigger('click');},
		success: function(data, status) {
			console.log('cHandler success');
			show(2);
			currentSum += parseInt(data);
			$('#control-ring li').eq(2).find('span').html(data);
			$('#control-ring li').eq(2).attr('class', '');
			if (index < 4) {
				var result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				while (result != undefined) {
					$('#message').html(result['msg']);
					errorIndex = makeError();			
					result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				}
			} else {
				var result = bubbleHandler(currentSum, errorIndex);
				while (result != undefined) {
					errorIndex = makeError();
					result = bubbleHandler(currentSum, errorIndex);
				}
			}
		}
	});
}

function dHandler(orderCall, index, currentSum, errorIndex) {
	if (errorIndex == 3) return {'msg':'他不知道(否)', 'sum':currentSum};
	$.ajax({
		type: 'get',
		url: '/',
		beforeSend: function() {$('#control-ring li').eq(3).trigger('click');},
		success: function(data, status) {
			console.log('dHandler success');
			show(3);
			currentSum += parseInt(data);
			$('#control-ring li').eq(3).find('span').html(data);
			$('#control-ring li').eq(3).attr('class', '');
			if (index < 4) {
				var result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				while (result != undefined) {
					errorIndex = makeError();			
					result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				}
			} else {
				var result = bubbleHandler(currentSum, errorIndex);
				while (result != undefined) {
					errorIndex = makeError();
					result = bubbleHandler(currentSum, errorIndex);
				}
			}
		}
	});
}

function eHandler(orderCall, index, currentSum, errorIndex) {
	if (errorIndex == 4) return {'msg':'才怪(否)', 'sum':currentSum};
	$.ajax({
		type: 'get',
		url: '/',
		beforeSend: function() {$('#control-ring li').eq(4).trigger('click');},
		success: function(data, status) {
			console.log('eHandler success');
			show(4);
			currentSum += parseInt(data);
			$('#control-ring li').eq(4).find('span').html(data);
			$('#control-ring li').eq(4).attr('class', '');
			//调用下一个handler并处理异常
			if (index < 4) {
				var result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				while (result != undefined) {
					errorIndex = makeError();			
					result = orderCall[index+1](orderCall, index+1, currentSum, errorIndex);
				}
			} else {
				var result = bubbleHandler(currentSum, errorIndex);
				while (result != undefined) {
					errorIndex = makeError();
					result = bubbleHandler(currentSum, errorIndex);
				}
			}
		}
	});
}

function bubbleHandler(currentSum, errorIndex) {
	if (errorIndex == 5) return {'msg':'楼主异步调用战斗力感人，目测不超过(否)'+currentSum, 'sum':currentSum};
	$('#message').html('楼主异步调用战斗力感人，目测不超过'+currentSum);
	$('#info-bar').html('<p>'+currentSum+'</p>');
}
//显示信息
function show(index) {
	if (index == 0) $('#message').html('这是个天大的秘密');
	else if (index == 1) $('#message').html('我不知道');
	else if (index == 2) $('#message').html('你不知道');
	else if (index == 3) $('#message').html('他不知道');
	else if (index == 4) $('#message').html('才怪');
}
//制造异常
function makeError() {
	var index;
	do {
		index = Math.round(Math.random()*5);
	} while (index == 0);
	return index;
}
