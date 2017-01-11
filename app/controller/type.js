// 电影的路由
var Type = require('../models/type');//拿到模型
var Comment = require('../models/comment');//拿到模型
var _ = require('underscore');//自定义封装对象


exports.new=function(req, res){
	res.render('type_admin',{
		title:'类别录入页',
		type:{
			name:''
		}
	})
};

exports.save=function(req, res){
	var typeObj = req.body.type;
	var id = typeObj._id;
	var _type;
	if(id !== 'undefined'){
		Type.findById(id, function(err, type){
			if(err){
				console.log(err)
			};
			_type = _.extend(type, typeObj);
			_type.save(function(err, type){
				if(err){console.log(err)};
				res.redirect('/admin/type/list');
			});
		});
	}
	else{
		_type = new Type({
			name	:typeObj.name

		});
		_type.save(function(err, type){
			if(err){console.log(err)};
			res.redirect('/admin/type/list');
		});
	}
};

exports.update=function(req, res){
	var id = req.params.id;
	if(id){
		Type.findById(id, function(err, voted){
			if(err){console.log(err)};
			res.render('type_admin',{
				title:'类别后台更新页',
				voted:voted
			})
		})
	} 
};

exports.list=function(req, res){
	Type.fetch(function(err, types){
		if(err){console.log(err)};
		res.render('type_list',{
			title:'voted类别列表页',
			types:types
		})
	});
};

exports.delete=function(req, res){
	var id = req.query.id;
	if(id){
		Type.remove({_id:id}, function(err, voted){
			if(err){console.log(err)};
			console.log("voted="+voted);
			res.json({success:1});
		})
	}
	else{
		res.json({success:0});
	}
};
