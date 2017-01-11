var Comment = require('../models/comment');//拿到模型
var _ = require('underscore');//自定义封装对象
exports.save=function(req, res){
	var user = req.session.user;
	var commentObj = req.body.comment;
	var movieId = commentObj.movie;

	if(commentObj.cid){
		Comment.findById(commentObj.cid, function(err, comment){
			if(err){console.log(err)};
			var reply = {
				from: commentObj.from,
				to: commentObj.tid,
				content: commentObj.content,
				createAt:Date.now()
			};

			comment.reply.push(reply);

			comment.save(function(err, comment){
				if(err){console.log(err)};
				res.redirect('/movie/'+ movieId);		
			});
		});
	}else{
		var _comment = new Comment(commentObj);
		_comment.save(function(err, comment){
			if(err){console.log(err)};
			res.redirect('/movie/'+ movieId);
		});
	}

};