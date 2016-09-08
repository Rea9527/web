var start = false;
var outMaze = false;
var outRoad = true;
var outBox = false;

window.onload = function() {
	blocks = document.getElementsByClassName('blocks');
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].onmouseover = mouseOverBlocks;
		blocks[i].onmouseout = mouseOutBlocks;		
	}
	road = document.getElementsByClassName("road");
	for (var j = 0; j < road.length; j++) road[j].onmouseover = mouseOverRoad;
	box = document.getElementById("start");
	box.onmouseover = mouseOverBox;
	exit = document.getElementById("end");
	exit.onmouseover = mouseOverExit;	
}

function mouseOverRoad() {
	if (start) {
		outRoad = false;
	}
}

function mouseOverBox() {
	if (!start) {
		outRoad = true;
		start = true;
		output = document.getElementById("outputBox");
		output.textContent = "";
	} else {
		outRoad = true;
	}
}

function mouseOverBlocks(event) {
	if (start) {
		event.target.className = "blocksChange";
		output.textContent = "You Lose!";
		start = false;
		outMaze = false;
	}
}

function mouseOutBlocks(event) {
	if (!start) {
		event.target.className = "blocks";
	}
}

function mouseOverExit(event) {
	if (outRoad) {
		output.textContent = "Don't cheat,you should start from the box and move to the exit inside the maze!";
		start = false;
		return;
	}
	if (start) output.textContent = "You Win!";
	start = false;
}