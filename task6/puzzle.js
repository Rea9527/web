var steps = 0;  // total steps
var bgi = 1; //background-image
var start = false;

window.onload = function() {
	puzzle = document.getElementById("puzzle");
	step = document.getElementById("step");
	reStart = document.getElementById("reStart");
	reStart.onclick = reStartGame;
	changeImg = document.getElementById("changeImg");
	changeImg.onclick = changeBackground;
	var frag = document.createDocumentFragment();
	//游戏未开始时图片显示
	for (var i = 0; i < 16; i++) {
		var row = parseInt(i/4+1), col = parseInt(i%4+1);
		var puzzlePart = document.createElement("div");
		puzzlePart.className = "bgi_"+bgi+" "+"row"+row+" "+"col"+col;
		if (i < 15) puzzlePart.id = "puzzleFrag"+(i+1);
		else puzzlePart.id = "puzzleFrag"+(i+1)+"_visible";
		frag.appendChild(puzzlePart);
	}
	puzzle.appendChild(frag);
	parts = puzzle.getElementsByTagName("div");
	for (var i = 0; i < parts.length; i++) {
		parts[i].onclick = partClicked;
	}
}

//获取可解拼图算法
function getKeJiePingTu(length){	
	data = [];
	var counter = 40000;
	var maxnumber = length;
	for(var i=0; i < maxnumber+5; ++i) data[i] = i;
	var blank = length-1, t;
	while (counter > 0) {
		var dir = parseInt(Math.random()*4);
		if (dir == 0) {
			if ((blank > 12&&blank <= 15)||(blank > 8&&blank <= 11)||
				(blank > 4&&blank <= 7)||(blank > 0&&blank <= 3)) {
				t = data[blank];
				data[blank] = data[blank-1];
				data[blank-1] = t;
				blank--;
			}
		} else if (dir == 1) {
			if ((blank < 3&&blank >= 0)||(blank < 7&&blank >= 4)||
				(blank < 11&&blank >= 8)||(blank < 15&&blank >= 12)) {
				t = data[blank];
				data[blank] = data[blank+1];
				data[blank+1] = t;
				blank++;
			}
		} else if (dir == 2) {
			if (blank > 3) {
				t = data[blank];
				data[blank] = data[blank-4];
				data[blank-4] = t;
				blank = blank-4;
			}
		} else {
			if (blank < 12) {
				t = data[blank];
				data[blank] = data[blank+4];
				data[blank+4] = t;
				blank = blank+4;
			}
		}
		counter--;
	}

}

//获取拼图
function getPuzzle() {
	getKeJiePingTu(16);
	// var puzzlePart = puzzle.getElementsByTagName("div");
	for (var i = 0; i < 16; i++) {
		parts[i].id = "puzzleFrag"+(data[i]+1);
		parts[i].tag = data[i]+1;
	}
	step.textContent = "Step: "+steps;
}

//鼠标点击拼图
function partClicked(event) {
	if (!start) {
		alert("The Game haven't been started!");
	} else {
		var targetClass = event.target.className;
		var targetX = parseInt(targetClass[9]), targetY = parseInt(targetClass[14]);
		var blankFrag = document.getElementById("puzzleFrag16");
		var blankClass = blankFrag.className;
		var blankX = parseInt(blankClass[9]), blankY = parseInt(blankClass[14]);
		//判断是否可走
		if ((blankX == targetX&&blankY == targetY-1)||(blankX == targetX&&blankY == targetY+1)||
			(blankX == targetX-1&&blankY == targetY)||(blankX == targetX+1&&blankY == targetY)) {
			event.target.className = "bgi_"+bgi+" "+"row"+blankX+" "+"col"+blankY;
			blankFrag.className = "bgi_"+bgi+" "+"row"+targetX+" "+"col"+targetY;
			steps++;
			step.textContent = "Step: "+steps;
		}
		//判断游戏是否结束
		if (check()) {
			document.getElementById("puzzleFrag16").id = "puzzleFrag16_visible";
			step.textContent = "You finish the game in "+steps+ " steps";
		}		
	}

}

//检测是否已完成拼图
function check() {
	for (var i = 0; i < parts.length; i++) {
		var targetClass = parts[i].className;
		var x = parseInt(targetClass[9]), y = parseInt(targetClass[14]);
		if ((x-1)*4+y != parts[i].tag) return false; 
	}
	start = false;
	return true;
}

//重新开始游戏
function reStartGame() {
	start = true;
	steps = 0;
	getPuzzle();
}

//更换背景
function changeBackground() {
	bgi = bgi%6+1;
	steps = 0;
	step.textContent = "Step: "+steps;
	for (var i = 0; i < parts.length; i++) {
		// var className = parts[i].className;
		parts[i].className = "bgi_"+bgi+" "+"row"+parts[i].className[9]+" "+"col"+parts[i].className[14];
	}
}