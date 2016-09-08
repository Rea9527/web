var validator = {
	form: {
		username: {
			status: false,
			errMsg: '用户名只能为8位数字学号'
		},
		password: {
			status: false,
			errMsg: '密码为6~12位数字、大小写字母、中划线、下划线'
		}
	},

	isUsernameValid: function(username) {
		return this.form.username.status = /^[0-9]{8}$/.test(username);
	},

	isPasswordValid: function(password) {
		this.password = password;
		return this.form.password.status = /^[a-zA-Z0-9_\-]{6,12}$/.test(password);
	},

	isRepeatPasswordValid: function(password) {
		return this.form.password.status = (password == this.password);
	},

	isFieldValid: function(fieldName, value) {
		var _fieldName = fieldName[0].toUpperCase()+fieldName.slice(1, fieldName.length);
		return this['is'+_fieldName+'Valid'](value);
	},

	isFormValid: function() {
		return (this.form.username.status&&this.form.password.status&&
			this.form.email.status);
	},

	getErrorMessage: function(fieldName) {
		if (fieldName == 'repeatPassword') return '两次输入密码不一致！';
		return this.form[fieldName].errMsg;
	},

	getExistMessage: function(fieldName) {
		if (fieldName == 'username') return '用户名已存在';
	},
}

if (typeof module == 'object') {
	module.exports = validator;
}
