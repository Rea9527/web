/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"

module.exports = function(db) {
  var blogHandler = require('../models/blogHandler.js')(db);

  var api = {

    // GET all index
    posts: function (req, res) {
      var posts = [];
      blogHandler.getAllPosts({})
      .then(function(allPosts) {
        allPosts.forEach(function (post, i) {
          if (post.hide == false) {
            posts.push({
              id: i,
              title: post.title,
              hide: false,
              text: post.text.substr(0, 100) + '...'
            });  
          } else {
            posts.push({
              id: i,
              title: post.title,
              hide: true,
              text: "该内容已被管理员隐藏..."
            });             
          }
        });
        res.json({
          posts: posts
        });  
      });
    },

    //GET my posts
    myPosts: function (req, res) {
      var _author = req.session.user.username;
      var posts = [];
      var filter = {author: _author};
      blogHandler.getAllPosts(filter)
      .then(function(allPosts) {
        allPosts.forEach(function (post, i) {
          if (post.hide == false) {
            posts.push({
              id: i,
              title: post.title,
              hide: false,
              text: post.text.substr(0, 100) + '...'
            });  
          } else {
            posts.push({
              id: i,
              title: post.title,
              hide: true,
              text: "该内容已被管理员隐藏..."
            });             
          }
        });
        res.json({
          posts: posts
        });  
      });
    },

    //GET one ReadPost
    post: function (req, res) {
      var id = req.params.id;
      var isMyComment = [];
      blogHandler.getAllPosts({}).then(function(allPosts) {
        if (id >= 0 && id < allPosts.length) {
          var post = allPosts[id];
          post.comments.forEach(function (comment, i) {
            comment.isMyComment = (comment.commentUser == req.session.user.username);
          });
          if (post.hide == true) post.text = "该内容已被管理员隐藏...";
          res.json({
            post: post
          });
        } else {
          res.json(false);
        }
      });
    },

    // POST addPost

    addPost: function (req, res) {
      var post = req.body;
      post.comments = [];
      post.author = req.session.user.username;
      post.hide = false;
      console.log(post.author);
      blogHandler.addPost(post);
      res.json(req.body);
    },
    // PUT editPost

    editPost: function (req, res) {
      var id = req.params.id;
      blogHandler.getAllPosts({}).then(function(allPosts) {
        if (id >= 0 && id < allPosts.length) {
          var existedPost = allPosts[id];
          var post = req.body;
          post.author = req.session.user.username;
          blogHandler.updatePost(existedPost, post).then(function() {
            res.json(true);
          });
        } else {
          res.json(false);
        }
      });
    },

    // DELETE

    deletePost: function (req, res) {
      var id = req.params.id;
      blogHandler.getAllPosts({}).then(function(allPosts) {
        if (id >= 0 && id < allPosts.length) {
          var post = allPosts[id];
          blogHandler.deletePost(post).then(function() {
            res.json(true);
          });
        } else {
          res.json(false);
        }
      });
    },

    addComment: function (req, res) {
      var comment = req.body;
      var id = req.params.id;
      blogHandler.getAllPosts({}).then(function(allPosts) {
        var post = allPosts[id];
        comment.commentUser = req.session.user.username;
        comment.isHide = false;
        if (id >= 0 && id < allPosts.length) {
          blogHandler.addComment(post, comment).then(function() {
            res.json(comment);
          });
        }
      });
    },

    deleteComment: function(req, res) {
      var id = req.params.id;
      var comment = req.body;
      blogHandler.getAllPosts({}).then(function(allPosts) {
        var post = allPosts[id];
        blogHandler.deleteComment(post, comment).then(function() {
          res.json(true);
        });
      });
    },

    hideComment: function(req, res) {
      var id = req.params.id;
      var comment = req.body;
      blogHandler.getAllPosts({}).then(function(allPosts) {
        var post = allPosts[id];
        blogHandler.hideComment(post, comment).then(function() {
          res.json(true);
        });
      });
    },

    showComment: function(req, res) {
      var id = req.params.id;
      var comment = req.body;
      blogHandler.getAllPosts({}).then(function(allPosts) {
        var post = allPosts[id];
        blogHandler.showComment(post, comment).then(function() {
          res.json(true);
        });
      });
    },

    hidePost: function(req, res) {
      var id = req.params.id;
      blogHandler.getAllPosts({}).then(function(allPosts) {
        var post = allPosts[id];
        post.hide = true;
        blogHandler.hidePost(post).then(function() {
          console.log("hide?");
          post.text = "该内容已被管理员隐藏...";
          res.json(post);
        });
      });
    },

    showPost: function(req, res) {
      var id = req.params.id;
      blogHandler.getAllPosts({}).then(function(allPosts) {
        var post = allPosts[id];
        post.hide = false;
        blogHandler.showPost(post).then(function() {
          res.json(post);
        });
      });      
    },

    isAdmin: function(req, res) {
      var isAdmin = (req.session.user.username == "admin111");
      res.json(isAdmin);
    }
  }


  return api;

}

