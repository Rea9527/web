var _ = require('lodash');

module.exports = function(db) {
	var posts = db.collection('posts');

	var blogHandler = {

		getAllPosts: function(filter) {
			return new Promise(function(resolve, reject) {
				posts.find(filter).toArray(function(err, docs) {
					resolve(docs);
				});
			}).then(function(result) {
				return result;
			});
		},

		addPost: function(post) {
			console.log("insert");
			posts.insert(post);
		},

		deletePost: function(post) {
			return posts.deleteOne({author: post.author, title: post.title, text: post.text});
		},

		addComment: function(post, comment) {
			return posts.updateOne({author: post.author, title: post.title, text: post.text}, 
				{$push: {comments: comment}});
		},

		deleteComment: function(post, comment) {
			var newComments = _.remove(post.comments, function(_comment) {
				return (_comment.commentUser != comment.commentUser||_comment.content != comment.content);
			});
			return posts.updateOne({author: post.author, title: post.title, 
				text: post.text}, {$set: {comments: newComments}});
		},

		hideComment: function(post, comment) {
			var index = _.findIndex(post.comments, function(o) {
		      return (o.commentUser == comment.commentUser&&
		      	o.content == comment.content);
		    });
		    post.comments[index].isHide = true;
			return posts.updateOne({author: post.author, title: post.title, 
				text: post.text}, {$set: {comments: post.comments}});
		},

		showComment: function(post, comment) {
			var index = _.findIndex(post.comments, function(o) {
		      return (o.commentUser == comment.commentUser&&
		      	o.content == comment.content);
		    });
		    post.comments[index].isHide = false;
			return posts.updateOne({author: post.author, title: post.title, 
				text: post.text}, {$set: {comments: post.comments}});
		},

		updatePost: function(existedPost, post) {
			return posts.updateOne({author: existedPost.author, title: existedPost.title,
			 text: existedPost.text, comments: existedPost.comments}, {$set: {title: post.title, text: post.text}});
		},

		hidePost: function(post) {
			return posts.updateOne({author: post.author, title: post.title, 
				text: post.text, comments: post.comments}, {$set: {hide: true}});
		},

		showPost: function(post) {
			return posts.updateOne({author: post.author, title: post.title, 
				text: post.text, comments: post.comments}, {$set: {hide: false}});			
		}
	}

	return blogHandler;
}