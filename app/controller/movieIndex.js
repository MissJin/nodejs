// 负责对首页的交互
var Movie = require('../models/movie');//拿到模型
var Category = require('../models/category');
//路由
exports.index=function(req, res){
	Category.find({})
		.populate({path:'movies', options:{limit:5}})
		.exec(function(err, categories){
			if(err){
				console.log(err);
			}
			res.render('movie_index',{
				title:'电影首页',
				categories:categories
			})

	});
};