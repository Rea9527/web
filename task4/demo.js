var formula1 = "";
var formula2 = "0";
var bracket = false;
var calOrNot = false;

window.onload=function() {
	document.getElementById("inputBox2").value = formula2;
	document.getElementById('button_1').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "1";
		else formula2 = formula2+"1";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_2').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "2";
		else formula2 = formula2+"2";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_3').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "3";
		else formula2 = formula2+"3";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_4').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "4";
		else formula2 = formula2+"4";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_5').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "5";
		else formula2 = formula2+"5";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_6').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "6";
		else formula2 = formula2+"6";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_7').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "7";
		else formula2 = formula2+"7";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_8').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "8";
		else formula2 = formula2+"8";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_9').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == "0") formula2 = "9";
		else formula2 = formula2+"9";
		document.getElementById("inputBox2").value = formula2;
	}
	document.getElementById('button_add').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		L2 = formula2.length-1;
		if (formula2[L2] == '.') formula2 = formula2.substr(0, L2-1);
		formula1 += formula2;
		if (formula2 != "0") formula2 = "0";
		document.getElementById("inputBox2").value = formula2;
		var L = formula1.length-1;
		if (formula1[L] == '+'||formula1[L] == '-'||formula1[L] == '*'||formula1[L] == '/')
		formula1[L] = '+';
		else formula1 = formula1+'+';
		document.getElementById("inputBox1").value = formula1;
	}
	document.getElementById('button_subtract').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		L2 = formula2.length-1;
		if (formula2[L2] == '.') formula2 = formula2.substr(0, L2-1);
		if (formula2 != "0") formula1 += formula2;
		formula2 = "0";
		document.getElementById("inputBox2").value = formula2;
		var L = formula1.length-1;
		if (formula1[L] == '+'||formula1[L] == '-'||formula1[L] == '*'||formula1[L] == '/')
		formula1[L] = '-';
		else formula1 = formula1+'-';
		document.getElementById("inputBox1").value = formula1;
	}

	document.getElementById('button_multiply').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		L2 = formula2.length-1;
		if (formula2[L2] == '.') formula2 = formula2.substr(0, L2-1);
		if (formula2 != "0") formula1 += formula2;
		formula2 = "0";
		document.getElementById("inputBox2").value = formula2;
		var L = formula1.length-1;
		if (formula1[L] == '+'||formula1[L] == '-'||formula1[L] == '*'||formula1[L] == '/')
		formula1[L] = '*';
		else formula1 = formula1+'*';
		document.getElementById("inputBox1").value = formula1;
	}

	document.getElementById('button_divide').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		L2 = formula2.length-1;
		if (formula2[L2] == '.') formula2 = formula2.substr(0, L2-1);
		if (formula2 != "0") formula1 += formula2;
		formula2 = "0";
		document.getElementById("inputBox2").value = formula2;
		var L = formula1.length-1;
		if (formula1[L] == '+'||formula1[L] == '-'||formula1[L] == '*'||formula1[L] == '/')
		formula1[L] = '/';
		else formula1 = formula1+'/';
		document.getElementById("inputBox1").value = formula1;
	}

	document.getElementById('button_0').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		if (formula2 == ""||formula2 == "0") formula2 = "0";
		else if (formula2[formula2.length-1] >= '0'&&formula2[formula2.length-1] <= '9')
			formula2 += "0";
		document.getElementById("inputBox2").value = formula2;
	}

	document.getElementById('button_dot').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		}
		var L2 = formula2.length-1;
		if (formula2.indexOf(".", 0) == -1) formula2 = formula2+".";
		document.getElementById("inputBox2").value = formula2;
	}

	document.getElementById('button_leftbracket').onclick=function() {
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
	}

	document.getElementById('button_rightbracket').onclick=function() {
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

	}

	document.getElementById('button_back').onclick=function() {
		if (calOrNot == true) {
			document.getElementById("inputBox2").value = "0";
			document.getElementById("inputBox1").value = "";
			calOrNot = false;
		} else {
			var L = formula2.length-1;
			formula2 = formula2.substr(0, L);
			document.getElementById("inputBox2").value = formula2;	
		}
	}
	
	document.getElementById('button_CE').onclick=function() {
		formula2 = "0";
		formula1 = ""
		document.getElementById("inputBox2").value = formula2;
		document.getElementById("inputBox1").value = formula1;
	}
	document.getElementById('button_equal').onclick=function() {
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

	}
}

