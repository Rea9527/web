

module.exports = function(db) {
	var homeworks = db.collection('homeworks');

	var workHandler = {
		getAllHomeworks: function(filter) {
			return new Promise(function(resolve, reject) {
				homeworks.find(filter).toArray(function(err, docs) {
					resolve(docs);
				});
			}).then(function(result) {
				return result;
			});
		},

		getOneHomework: function(username, homeworkId) {
			return homeworks.findOne({username:username, homeworkId:homeworkId})
			.then(function(homework) {
				return Promise.resolve(homework);
			});
		},

		taHomework: function(homework) {
			return homeworks.insert(homework);
		},

		deleteHomework: function(homework) {
			return homeworks.deleteOne({username:homework.username, homeworkId:homework.homeworkId});
		},

		updateTAComment: function(username, homeworkId, TAcomment) {
			return homeworks.updateOne({username:username, homeworkId:homeworkId},
				{$set: {TAcomment:TAcomment}});
		},

		updateComments: function(username, homeworkId, comments) {
			return homeworks.updateOne({username:username, homeworkId:homeworkId},
				{$set: {comments:comments}});			
		}
	}

	return workHandler;
}