var start = false;
var score = 0;
var time = 30;
var currentMole = -1;
var num = 0;

window.onload = function() {
	moles = document.getElementsByClassName("circle");
	for (var i = 0; i < moles.length; i++) {
		moles[i].onclick = moleClick;
		moles[i].checked = false;
		moles[i].disabled = true;
	}
	Btn = document.getElementById("startAndStop");
	Btn.onclick = btnClick;
	infor = document.getElementById("infor");
	totalScore = document.getElementById("totalScore");
	timeLeft = document.getElementById("timeLeft");

}

function btnClick() {
	if (!start) {
		for (var i = 0; i < moles.length; i++) {
			moles[i].checked = false;
			moles[i].disabled = false;
		}
		start = true;
		infor.textContent = "Playing";
		totalScore.textContent = ""+score;
		timeLeft.textContent = ""+time;
		id = setInterval(timeCount, 1000);
		num = Math.random()*60;
		currentMole = parseInt(num);
		moles[currentMole].checked = true;
	} else {
		for (var i = 0; i < moles.length; i++) moles[i].disabled = true;
		if (score > 1) alert("You have got "+score+" points totally!");
		else if (score == 1) alert("You have got "+score+" point totally!");
		else alert("You are such a bad player!");
		start = false;
		infor.textContent = "Game Over!";
		timeLeft.textContent = "0";
		clearInterval(id);
		time = 30;
		score = 0;
		moles[currentMole].checked = false;
		currentMole = -1;		
	}
}

function timeCount() {
	if (start&&time > 0) {
		time--;
		timeLeft.textContent = ""+time;
	} else if (start&&time == 0) {
		alert("Time out! You have got "+score+" points totally!");
		timeLeft.textContent = "0";
		for (var i = 0; i < moles.length; i++) moles[i].disabled = true;
		infor.textContent = "Game Over!";
		clearInterval(id);
		start = false;
		time = 30;
		score = 0;
		currentMole = -1;
	}
}

// function game() {

// }

function moleClick(event) {
	if (start) {
		if (currentMole == -1) {
			num = Math.random()*60;
			currentMole = parseInt(num);
			moles[currentMole].checked = true;	
		} else if (event.target == moles[currentMole]) {
			num = Math.random()*60;
			currentMole = parseInt(num);
			score++;
			totalScore.textContent = ""+score;
			event.target.checked = false;
			moles[currentMole].checked = true;
		} else {
			score--;
			totalScore.textContent = ""+score;
			event.target.checked = false;
		}
	}1
}