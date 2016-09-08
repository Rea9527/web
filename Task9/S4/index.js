var click = [false, false, false, false, false];
var num = [-1,-1,-1,-1,-1];

$(window).ready(function() {
	$('#control-ring li').click(function() {
		var cur = $(this);
		var index = parseInt($(this).index());
		var nextIndex = getNextIndex(index);
		if (click[index] != true&&cur.attr('class') == 'able') {
			var span = cur.find('span');
			var nextSpan = $('#control-ring li').eq(num[nextIndex]).find('span');
			$.ajax({
				type: "get",
				url: "/",
				success: function(data, status) {
					nextSpan.attr('class', '');
					nextSpan.html('..');
					span.html(data);
					cur.siblings('.unable').attr('class', 'able');
					cur.attr('class', '');
					click[index] = true;
					if (index == num[4]) $('#info-bar').trigger('click');
				},
			});	
		} else {
			return false;
		}
	});
	$('#info-bar').click(barClick);
	$('#button').hover(function() {getRandomNum();}, clearData);
	$('div .apb').click(robort);
});
//apb点击后机器人启动
function robort() {
	if ($('#order').html() == '') {
		showOrder();
		var li = $('#control-ring li');
		li.eq(num[0]).find('span').attr('class', '');
		li.eq(num[0]).find('span').html('..');
		for (var i = 0; i < 5; i++) li.eq(num[i]).trigger('click');		
	}
}
//遍历click 判断是否全部被点击
function traverse() {
	for (var i = 0; i < 5; i++) if (click[i] == false) return false;
	return true;
}
//大气泡被点击
function barClick() {
	if (traverse()&&$(this).html() == '<p></p>') {
		var sum = 0;
		for (var i = 0; i < 5; i++) sum += parseInt($('span').eq(i).html());
		$(this).html('<p>'+sum+'</p>');
	} else {
		return false;
	}	
}
//清零
function clearData() {
	$('#control-ring li').attr('class', 'able');
	$('#control-ring li span').attr('class', 'msg');
	$('#info-bar').html('<p></p>');
	click = [false, false, false, false, false];
	$('#order').html('');
}
//获取随机顺序
function getRandomNum() {
	num.splice(0,num.length);
	var data;
	for (var i = 0; i < 5; i++) {
		do {
			data = Math.round(Math.random()*4);
		} while (num[0] == data||num[1] == data||num[2] == data
			||num[3] == data||num[4] == data);
		console.log(data);
		num[i] = data;
	}
}

function getNextIndex(data) {
	for (var i = 0; i < 5; i++) if (num[i] == data) return parseInt(i+1);
}

function showOrder() {
	var dic = {
		0: 'A',
		1: 'B',
		2: 'C',
		3: 'D',
		4: 'E'
	};
	var str = dic[num[0]]+'->'+dic[num[1]]+'->'+dic[num[2]]
				+'->'+dic[num[3]]+'->'+dic[num[4]];
	$('#order').html(str);
}