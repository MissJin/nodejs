// 的路由
var Voted = require('../models/voted');//拿到模型
var Comment = require('../models/comment');//拿到模型
var Category = require('../models/category');//拿到模型
var Type = require('../models/type');//拿到模型
var _ = require('underscore');//自定义封装对象

/*
exports.detail=function(req, res){
	var id = req.params.id;
	Voted.findById(id, function(err, voted){
		if (err) { console.log(err)};
		//添加评论数据
		Comment
			.find({voted: voted._id})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.sort({'meta.updateAt':-1})
			.exec(function(err, comments){
				if(err){console.log(err)};
				console.log(comments)

				res.render('detail',{
					title:'详情'+ voted.title,
					voted:voted,
					comments:comments
				});
		});

	})
};
*/
exports.new=function(req, res){
	Type.find({}, function(err, types){
		if(err){console.log(err)};

		res.render('voted_admin',{
			title:'新增一个voted后台页',
			voted:{
				title:'',
				name:'',
				image:'',
				summary:''
			},
			types:types
		})
	});
};

exports.save=function(req, res){
	var votedObj = req.body.voted;
	var id = votedObj._id;
	var _voted;
	if(id !== 'undefined'){
		Voted.findById(id, function(err, voted){
			if(err){
				console.log(err)
			};
			_voted = _.extend(voted, votedObj);
			_voted.save(function(err, voted){
				if(err){console.log(err)};
				//res.redirect('/voted/'+ voted._id);//跳转到详情页
				res.redirect('/admin/voted/list');//跳转到列表页
			});
		});
	}
	else{
		_voted = new Voted({
			title	:votedObj.title,
			name	:votedObj.name,
			image	:votedObj.image,
			summary	:votedObj.summary,
			type    :votedObj.type
		});
		var typesId = _voted.type;
		_voted.save(function(err, voted){
			if(err){console.log(err)};
			console.log(voted);

			Type.findById(typesId, function(err, types){
				if(voted._id){
					types.voteds.push(voted._id);
				}
				types.save(function(err, types){
					if(err){console.log(err)};
					//res.redirect('/voted/'+ voted._id);//跳转到详情页
					res.redirect('/admin/voted/list');//跳转到列表页

				});
			});
		});
	}
};

exports.update=function(req, res){
	var id = req.params.id;
	//找类别
	Type.find({}, function(err, types){
		if(err){console.log(err)};
		if(id){
			Voted.findOne({_id:id})
				// .populate('category','name')
				.exec( function(err, voted){
					if(err){console.log(err)};
					console.log('voted=>'+voted)
					res.render('admin',{
						title:'电影后台更新页',
						voted:voted,
						types:types
					})
			})
		} 
	});
};

exports.list=function(req, res){
	Voted.fetch(function(err, voteds){
		if(err){console.log(err)};
		res.render('voted_list',{
			title:'voted列表页',
			voteds:voteds
		})
	});
};

exports.delete=function(req, res){
	var id = req.query.id;
	if(id){
		Voted.remove({_id:id}, function(err, voted){
			if(err){console.log(err)};
			console.log("voted="+voted);
			res.json({success:1});
		})
	}
	else{
		res.json({success:0});
	}
};
