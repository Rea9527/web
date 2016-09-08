var click = [false, false, false, false, false];

$(window).ready(function() {
	//点击事件
	$('#control-ring li').click(function() {
		var cur = $(this);
		var index = parseInt($(this).index());
		if (click[index] != true&&cur.attr('class') == 'able') {
			var span = cur.find('span');
			$.ajax({
				type: "get",
				url: "/",
				beforeSend: function(XMLReq) {
					span.attr('class', '');
					span.html('..');
					cur.siblings('.able').attr('class', 'unable');
				},
				success: function(data, status) {
					span.html(data);
					cur.siblings('.unable').attr('class', 'able');
					cur.attr('class', '');
					click[index] = true;
				},
			});			
		} else {
			return false;
		}
	});
	$('#info-bar').click(barClick);
	$('#button').hover(function() {}, clearData);
});
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
}