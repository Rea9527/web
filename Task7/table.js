$(function() {
	$("table thead th").click(function() {
		//判断点击对象,即以哪个属性来排序
		if ($(this).index() == 0) sortTable(this, 0);
		else if ($(this).index() == 1) sortTable(this, 1);
		else if ($(this).index() == 2) sortTable(this, 2);
	});
});
//对表格排序
function sortTable(t, s) {
	if ($(t).attr('class') != 'increase'&&$(t).attr('class') != 'decrease')
		$(t).parent().find("th").removeAttr('class');
	var table = $(t).parent().parent().parent();
	var arr = table.find('tbody tr');
	if (!$(t).attr('class')||$(t).attr('class') == 'decrease') increaseSort(t, arr, s);
	else if ($(t).attr('class') == 'increase') decreaseSort(t, arr, s);		
	table.find('tbody').empty().append(arr);
	setAlt(arr);
}
//升序排列
function increaseSort(t, arr, s) {
	$(t).attr('class', 'increase');
	arr.sort(function(a, b) {
		return $(a).children("td").eq(parseInt(s)).html() > $(b).children("td").eq(parseInt(s)).html()?1:-1;
	});
}
//降序排列
function decreaseSort(t, arr, s) {
	$(t).attr('class', 'decrease');
	arr.sort(function(a, b) {
		return $(a).children("td").eq(parseInt(s)).html() < $(b).children("td").eq(parseInt(s)).html()?1:-1;
	});
}
//设置奇数行背景为灰色
function setAlt(arr) {
	if (arr.eq(1).attr('class') != 'alternate') {
		arr.eq(1).attr('class', 'alternate');
		arr.eq(0).removeAttr('class');
		arr.eq(2).removeAttr('class');
	}
}
