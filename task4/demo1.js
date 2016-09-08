var formula1 = "";
var formula2 = "0";
var bracket = false;
var calOrNot = false;

window.onload=function() {
	document.getElementById("inputBox2").value = formula2;
	click();
}

function click() {
	var btn = document.getElementById("keyboard").getElementsByTagName("button")
	for (var i = 0; i < btn.length; i++) {
		btn[i].onclick = function() {
			if (this.id == "button_add"||this.id == "button_divide"||this.id == "button_subtract"||this.id == "button_multiply") {
				if (calOrNot == true) {
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = "";
					calOrNot = false;
				}
				L2 = formula2.length-1;
				if (formula2[L2] == '.') formula2 = formula2.substr(0, L2-1);
				formula1 += formula2;
				formula2 = "0";
				document.getElementById("inputBox2").value = formula2;
				var L = formula1.length-1;
				if (formula1[L] == '+'||formula1[L] == '-'||formula1[L] == '*'||formula1[L] == '/')
				formula1[L] = this.value;
				else formula1 = formula1+this.value;
				document.getElementById("inputBox1").value = formula1;				
			} else if (this.id == 'button_0') {
				if (calOrNot == true) {
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = "";
					calOrNot = false;
				}
				if (formula2 == ""||formula2 == "0") formula2 = "0";
				else if (formula2[formula2.length-1] >= '0'&&formula2[formula2.length-1] <= '9')
					formula2 += "0";
				document.getElementById("inputBox2").value = formula2;				
			} else if (this.id == 'button_dot') {
				if (calOrNot == true) {
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = "";
					calOrNot = false;
				}
				var L2 = formula2.length-1;
				if (formula2.indexOf(".", 0) == -1) formula2 = formula2+".";
				document.getElementById("inputBox2").value = formula2;				
			} else if (this.id == 'button_rightbracket') {
				if (calOrNot == true) {
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = "";
					calOrNot = false;
				}
				var formula3;
				if (bracket == true) {
					formula3 = formula2+")";
					formula2 = "";
					formula1 += formula3;
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = formula1;
					bracket = false;			
				}				
			} else if (this.id == 'button_leftbracket') {
				if (calOrNot == true) {
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = "";
					calOrNot = false;
				}
				var formula3 = "(";
				if (bracket == false) {
					if (formula2 != "0") formula3 += formula2;
					formula2 = "";
					formula1 += formula3;
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = formula1;
					bracket = true;
				}
			} else if (this.id == 'button_CE') {
				formula2 = "0";
				formula1 = ""
				document.getElementById("inputBox2").value = formula2;
				document.getElementById("inputBox1").value = formula1;			
			} else if (this.id == 'button_back') {
				if (calOrNot == true) {
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = "";
					calOrNot = false;
				}
				var L = formula2.length-1;
				formula2 = formula2.substr(0, L);
				document.getElementById("inputBox2").value = formula2;			
			} else if (this.id = 'button_equal') {
				calOrNot = true;
				formula1 += formula2;
				formula2 = "0";
				if (bracket == true) formula1 = formula1+")";
				bracket = false;
				document.getElementById("inputBox1").value = formula1;

				try  {
		     		eval(formula1);
		     	}

				catch(exception) {
					if (exception) {
						alert(exception);
						formula1 = "";
						document.getElementById("input").value = formula1;
						return;
					}
		     	}

		     	var result;
				result = eval(formula1);
				formula1 = "";
				document.getElementById("inputBox2").value = result;		
			} else {
				if (calOrNot == true) {
					document.getElementById("inputBox2").value = "0";
					document.getElementById("inputBox1").value = "";
					calOrNot = false;
				}
				if (formula2 == "0") formula2 = "1";
				else formula2 = formula2+"1";
				document.getElementById("inputBox2").value = formula2;
			}
		};
	}
}