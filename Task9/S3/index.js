var click = [false, false, false, false, false];
var start = false;

$(window).ready(function() {
	$('#control-ring li').click(function() {
		var cur = $(this);
		var index = parseInt($(this).index());
		if (click[index] != true&&cur.attr('class') == 'able') {
			var span = cur.find('span');
				ajax(cur, span, index);	
		} else {
			return false;
		}
	});
	$('#info-bar').click(barClick);
	$('#button').hover(function() {}, clearData);
	$('div .apb').click(robort);
});

function ajax(cur, span, index) {
			$.ajax({
				type: "get",
				url: "/"+index,
				beforeSend: function(XMLReq) {
					span.attr('class', '');
					span.html('..');
				},
				success: function(data, status) {
					span.html(data);
					console.log(data);
					cur.attr('class', '');
					click[index] = true;
					if (traverse()) $('#info-bar').trigger('click');

				},
			});
}

function robort() {
	if (start == false) {
		for (var i = 0; i < 5; i++) $('#control-ring li').eq(i).trigger('click');
		start = true;	
	}
}

function traverse() {
	for (var i = 0; i < 5; i++) if (click[i] == false) return false;
	return true;
}

function barClick() {
	if (traverse()&&$(this).html() == '<p></p>') {
		var sum = 0;
		for (var i = 0; i < 5; i++) sum += parseInt($('span').eq(i).html());
		$(this).html('<p>'+sum+'</p>');
	} else {
		return false;
	}	
}

function clearData() {
	$('#control-ring li').attr('class', 'able');
	$('#control-ring li span').attr('class', 'msg');
	$('#info-bar').html('<p></p>');
	click = [false, false, false, false, false];
	start = false;
}