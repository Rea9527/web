var validator = {
	form: {
		username: {
			status: false,
			errMsg: '6~18位英文字母、数字或下划线，必须以英文字母开头'
		},
		password: {
			status: false,
			errMsg: '6~12位数字、大小写字母、中划线、下划线'
		},
		studentId: {
			status: false,
			errMsg: '8位数字，不能以0开头'
		},
		phone: {
			status: false,
			errMsg: '11位数字，不能以0开头'
		},
		email: {
			status: false,
			errMsg: '请输入正确格式邮箱'
		}
	},

	isUsernameValid: function(username) {
		return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
	},

	isPasswordValid: function(password) {
		this.password = password;
		return this.form.password.status = /^[a-zA-Z0-9_\-]{6,12}$/.test(password);
	},

	isRepeatPasswordValid: function(password) {
		return this.form.password.status = (password == this.password);
	}

	isStudentIdValid: function(studentId) {
		return this.form.studentId.status = /^[1-9][0-9]{7}$/.test(studentId);
	},

	isPhoneValid: function(phone) {
		return this.form.phone.status = /^[1-9][0-9]{10}$/.test(phone);
	},

	isEmailValid: function(email) {
		return this.form.email.status = /^[a-zA-z0-9_\-]+@(([a-zA-z0-9_\-])+\.)+[a-zA-z]{2,4}$/.test(email);
	},

	isFieldValid: function(fieldName, value) {
		var _fieldName = fieldName[0].toUpperCase()+fieldName.slice(1, fieldName.length);
		console.log(_fieldName);
		return this['is'+_fieldName+'Valid'](value);
	},

	isFormValid: function() {
		return (this.form.username.status&&this.form.password.status&&this.form.studentId.status&&
			this.form.phone.status&&this.form.email.status);
	},

	getErrorMessage: function(fieldName) {
		return this.form[fieldName].errMsg;
	},

	isAttrExist: function(registry, user, attr) {
		for (var registedUser in registry) {
			if (registry.hasOwnProperty(registedUser)&&registry[registedUser][attr] == user[attr]) return false;
		}
		return true;
	}
}

if (typeof module == 'object') {
	module.exports = validator;
}