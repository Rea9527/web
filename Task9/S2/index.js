var click = [false, false, false, false, false];
var start = false;

$(window).ready(function() {
	$('#control-ring li').click(function() {
		var cur = $(this);
		var index = parseInt($(this).index());
		if (click[index] != true&&cur.attr('class') == 'able') {
			var span = cur.find('span');
			$.ajax({
				type: "get",
				url: "/",
				success: function(data, status) {
					cur.next().find('span').attr('class', '');
					cur.next().find('span').html('..');
					span.html(data);
					cur.siblings('.unable').attr('class', 'able');
					cur.attr('class', '');
					click[index] = true;
					if (index == 4) $('#info-bar').trigger('click');
				},
			});			
		} else {
			return false;
		}
	});
	$('#info-bar').click(barClick);
	$('#button').hover(function() {}, clearData);
	$('div .apb').click(robort);
});
//apb被点击后机器人启动
function robort() {
	if (start == false) {
		var li = $('#control-ring li');
		li.eq(0).find('span').attr('class', '');
		li.eq(0).find('span').html('..');
		for (var i = 0; i < 5; i++) li.eq(i).trigger('click');
		start = true;
	}
}
//遍历click 判断是否全部被点击
function traverse() {
	for (var i = 0; i < 5; i++) if (click[i] == false) return false;
	return true;
}
//大气泡被点击后触发事件
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
	start = false;
}