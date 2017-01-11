// 电影的路由
var Movie = require('../models/movie');//拿到模型
var Comment = require('../models/comment');//拿到模型
var Category = require('../models/category');//拿到模型
var _ = require('underscore');//自定义封装对象

exports.detail=function(req, res){
	var id = req.params.id;
	Movie.findById(id, function(err, movie){
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
	Category.find({}, function(err, categories){
		if(err){console.log(err)};

		res.render('admin',{
			title:'电影后台页',
			movie:{
				title:'',
				doctor:'',
				language:'',
				country:'',
				year:'',
				poster:'',
				flash:'',
				summary:''
			},
			categories:categories
		})
	});
};

exports.save=function(req, res){
	var movieObj = req.body.movie;
	var id = movieObj._id;
	// var title = movieObj.title;
	// console.log(movieObj);
	var _movie;
	if(id !== 'undefined'){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err)
			};
			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie){
				if(err){console.log(err)};
				res.redirect('/movie/'+ movie._id);
			});
		});
	}
	else{
		_movie = new Movie({
			doctor	:movieObj.doctor,
			title	:movieObj.title,
			year	:movieObj.year,
			language:movieObj.language,
			country	:movieObj.country,
			flash	:movieObj.flash,
			poster	:movieObj.poster,
			summary	:movieObj.summary,
			category:movieObj.category
		});
		var categoryId = _movie.category;
		_movie.save(function(err, movie){
			if(err){console.log(err)};
			Category.findById(categoryId, function(err, category){
				if(movie._id){
					category.movies.push(movie._id);
				}
				category.save(function(err, category){
					if(err){console.log(err)};
					res.redirect('/movie/'+ movie._id);

				});
			});
		});
	}
};

exports.update=function(req, res){
	var id = req.params.id;
	//找类别
	Category.find({}, function(err, categories){
		if(err){console.log(err)};
		if(id){
			Movie.findOne({_id:id})
				// .populate('category','name')
				.exec( function(err, movie){
					if(err){console.log(err)};
					console.log('movie=>'+movie)
					res.render('admin',{
						title:'电影后台更新页',
						movie:movie,
						categories:categories
					})
			})
		} 
	});
};

exports.list=function(req, res){
	Movie.fetch(function(err, movies){
		if(err){console.log(err)};
		res.render('list',{
			title:'电影列表页',
			movies:movies
		})
	});
};

exports.delete=function(req, res){
	var id = req.query.id;
	if(id){
		Movie.remove({_id:id}, function(err, movie){
			if(err){console.log(err)};
			console.log("movie="+movie);
			res.json({success:1});
		})
	}
	else{
		res.json({success:0});
	}
};
