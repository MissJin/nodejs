// 负责对首页的交互
var Movie = require('../models/movie');//拿到模型
var Type = require('../models/type');
//路由
exports.index=function(req, res){
	Type.find({})
		.populate({path:'voteds', options:{limit:10,sort:{total:-1}}}) //voted表中的排序
		// .sort({'meta.createAt':1}) //type表中的排序
		.exec(function(err, types){
			if(err){
				console.log(err);
			}
			//console.log(types);
			res.render('index',{
				title:'投票首页',
				types:types
			})

	});
};