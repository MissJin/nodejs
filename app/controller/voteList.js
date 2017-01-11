// 的路由
require('date-utils');//时间控件
var moments = require('moment');
var Voted = require('../models/voted');//拿到模型
var Comment = require('../models/comment');//拿到模型
var Category = require('../models/category');//拿到模型
var Type = require('../models/type');//拿到模型
var VoteList = require('../models/voteList');//拿到模型,每次有人投票就加一条记录
var _ = require('underscore');//自定义封装对象
var baseconfig = require('../../config/baseconfig');//引入配置文件

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
/*
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
*/
exports.save=function(req, res){
	var voted_id = req.query.voted_id;
	var user_id = req.query.user_id;
	console.log(voted_id,user_id);//成功获取
	//下一步做：添加新记录
	_voteList = new VoteList({
		voted_id: voted_id,
		vote:user_id
	});
	//控制投票次数，每人一天不超过5次
	//系统时间
	/*
	var nowTime = new Date();
	var startTime = nowTime.getFullYear()+'-'+nowTime.getMonth()+'-'+nowTime.getDate()+' 00:00:00';
	var endTime = nowTime.getFullYear()+'-'+nowTime.getMonth()+'-'+nowTime.getDate()+' 23:59:59';
	console.log('当前时间',new Date(startTime),new Date(endTime));
	*/
	/*
	console.log('当前时间Date.yesterday().toLocaleString(),Date.today().toLocaleString()\n',Date.yesterday().toLocaleString(),Date.today().toLocaleString());
	console.log('当前时间Date.today().toLocaleString(),Date.tomorrow().toLocaleString()\n',Date.today().toLocaleString(),Date.tomorrow().toLocaleString());//这个2016-12-26 00：00：00 -2016-12-27 00：00：00
	console.log('当前时间Date.yesterday(),Date.today()\n',Date.yesterday(),Date.today());
	console.log('当前时间Date.today(),Date.tomorrow()\n',Date.today(),Date.tomorrow());
	console.log('当前时间moment()\n', moments().format('L') );
	*/
	VoteList.find({vote:user_id}).where('meta.createAt').gte(Date.today().toLocaleString()).lte(Date.tomorrow().toLocaleString()).exec(function(err, votelist){
		if(err){console.log(err)};
		var voteCurruntDay = votelist.length;
		console.log("今天投票数：======",voteCurruntDay);
		console.log("每天限制投票数:======"+baseconfig().voteTime);
		if(voteCurruntDay < baseconfig().voteTime){
			doSave();

		}
		
	});
	function doSave(){
		_voteList.save(function(err, voteList){
			if(err){console.log(err)};


			//刷新一下首页，重新获得投票数
			VoteList.find({voted_id:voted_id},function(err, votelist){
				if(err){console.log(err)};
				//组合投票首页的展示数据
				var votedCount = votelist.length;
				console.log("当前票数："+votedCount);
				//更新 被投者票数
				Voted.findByIdAndUpdate({_id:voted_id},{total:votedCount}, function(err, voted){
					if(err) return handleError(err);
				});

				res.redirect('/');
				
				/*
				Type.find({})
					.populate({path:'voteds', options:{limit:10}})
					.exec(function(err, types){
						if(err){
							console.log(err);
						};
						console.log(types[0].voteds[0].total);
						//res.redirect('/');
						res.render('index',{
							title:'投票首页',
							types:types,
							voteNumber:votedCount
						});

				});
				*/	
			});
		});
	};

/*
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
				res.redirect('/voted/list');//跳转到列表页
			});
		});
	}
	else{
		_voted = new Voted({
			title	:votedObj.title,
			name	:votedObj.name,
			image	:votedObj.image,
			summary	:votedObj.summary,
			type   :votedObj.type
		});
		var typesId = _voted.type;
		_voted.save(function(err, voted){
			if(err){console.log(err)};
			Types.findById(typesId, function(err, types){
				if(voted._id){
					types.voteds.push(voted._id);
				}
				types.save(function(err, types){
					if(err){console.log(err)};
					//res.redirect('/voted/'+ voted._id);//跳转到详情页
					res.redirect('/voted/list');//跳转到列表页

				});
			});
		});
	}
	*/
};



exports.list=function(req, res){
	VoteList.fetch(function(err, voteds){
		if(err){console.log(err)};
		res.render('voteList_list',{
			title:'voted列表页',
			voteLists:voteLists
		})
	});
};


