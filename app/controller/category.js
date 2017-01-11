// 电影的路由
var Category = require('../models/category');//拿到模型
var Comment = require('../models/comment');//拿到模型
var _ = require('underscore');//自定义封装对象

exports.detail=function(req, res){
	var id = req.params.id;
	Category.findById(id, function(err, movie){
		if (err) { console.log(err)};
		//添加评论数据
		Comment
			.find({movie: movie._id})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.sort({'meta.updateAt':-1})
			.exec(function(err, comments){
				if(err){console.log(err)};
				console.log(comments)

				res.render('detail',{
					title:'电影详情'+ movie.title,
					movie:movie,
					comments:comments
				});
		});

	})
};

exports.new=function(req, res){
	res.render('category_admin',{
		title:'电影类别录入页',
		category:{
			name:''
		}
	})
};

exports.save=function(req, res){
	var categoryObj = req.body.category;
	var id = categoryObj._id;
	var _category;
	if(id !== 'undefined'){
		Category.findById(id, function(err, category){
			if(err){
				console.log(err)
			};
			_category = _.extend(category, categoryObj);
			_category.save(function(err, category){
				if(err){console.log(err)};
				res.redirect('/admin/category/list');
			});
		});
	}
	else{
		_category = new Category({
			name	:categoryObj.name

		});
		_category.save(function(err, category){
			if(err){console.log(err)};
			res.redirect('/admin/category/list');
		});
	}
};

exports.update=function(req, res){
	var id = req.params.id;
	if(id){
		Category.findById(id, function(err, movie){
			if(err){console.log(err)};
			res.render('admin',{
				title:'电影后台更新页',
				movie:movie
			})
		})
	} 
};

exports.list=function(req, res){
	Category.fetch(function(err, categories){
		if(err){console.log(err)};
		res.render('category_list',{
			title:'电影类别列表页',
			categories:categories
		})
	});
};

exports.delete=function(req, res){
	var id = req.query.id;
	if(id){
		Category.remove({_id:id}, function(err, movie){
			if(err){console.log(err)};
			console.log("movie="+movie);
			res.json({success:1});
		})
	}
	else{
		res.json({success:0});
	}
};
