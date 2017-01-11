var _ = require('underscore');//自定义封装对象

var Index = require('../app/controller/index.js');
var MovieIndex = require('../app/controller/movieIndex.js');
var Movie = require('../app/controller/movie.js');
var User = require('../app/controller/user.js');
var Comment = require('../app/controller/comment.js');
var Category = require('../app/controller/category.js');
var Voted = require('../app/controller/voted.js');
var VoteList = require('../app/controller/voteList.js');
var Type = require('../app/controller/type.js');
//接入微信
var wechat = require('wechat');
var fs = require('fs');
var API = require('wechat-api');
/*
// 订阅号的配置（自定义菜单要认证）
var config = {
  token: 'xiaohuang',
  appid: 'wx6b5b46f442e37e92',
  encodingAESKey: 'nuhAigIWNpBKf7CXPxb8SzN0uleIf4HxaHJkc9OdkGz'
};
*/
// 微信测试号的配置
var config = {
  token: 'xiaohuangtest',
  appid: 'wxaf56dbd7590685dd',
  encodingAESKey: 'nuhAigIWNpBKf7CXPxb8SzN0uleIf4HxaHJkc9OdkGz'
};
var appsecret = '71a758a61e255a2a9b245ca32a559ef1';
//var API = wechat.API;
var api = new API(config.appid, '71a758a61e255a2a9b245ca32a559ef1');



module.exports = function(app){

	// 会话持久化预处理
	app.use(function(req, res, next){
		var _user = req.session.user;
		//console.log(_user);
		if(_user !== undefined){
			console.log('现在登入的用户为：\n',"_id:"+_user._id,"name:"+_user.name,"mobile:"+_user.mobile);
		}else{
			console.log('您还未登入系统！');
		}
		app.locals.user = _user;
		return	next();
	});

	//首页相关
	app.get('/', Index.index);

	//Movie相关 
	app.get('/movie/:id', User.signinRequired, Movie.detail);
	app.get('/admin/movie',User.signinRequired, User.adminRequired, Movie.new);
	// 加载——更新数据
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
	// 增加一个路由，处理post请求过来的数据
	app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.save);
	app.get('/admin/movie/list', User.signinRequired, User.adminRequired,  Movie.list);
	// 添加删除的路由
	app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.delete);

	// User相关
	//signup
	app.post('/user/signup', User.signup);
	//signin
	app.post('/user/signin', User.signin);
	// logout
	app.get('/user/logout', User.logout);
	//登入页面
	app.get('/signin', User.showSignin);
	//注册页面
	app.get('/signup', User.showSignup);

	//Comment相关，电影评论
	app.post('/user/comment/save', User.signinRequired, Comment.save);

	// Category相关 , 电影类别
	app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new);
	app.post('/admin/category/save', User.signinRequired, User.adminRequired, Category.save);
	app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list);



	// voted被评论的物件
	//app.get('/voted/:id', User.signinRequired, Voted.detail);
	app.get('/admin/voted/new',User.signinRequired, User.adminRequired, Voted.new);
	// 加载——更新数据
	app.get('/admin/voted/update/:id', User.signinRequired, User.adminRequired, Voted.update);
	// 增加一个路由，处理post请求过来的数据
	app.post('/admin/voted/save', User.signinRequired, User.adminRequired, Voted.save);
	app.get('/admin/voted/list', User.signinRequired, User.adminRequired,  Voted.list);
	// 添加删除的路由
	app.delete('/admin/voted/list', User.signinRequired, User.adminRequired, Voted.delete);

	// voted的type类型
	app.get('/admin/type/new', User.signinRequired, User.adminRequired, Type.new);
	app.post('/admin/type/save', User.signinRequired, User.adminRequired, Type.save);
	app.get('/admin/type/list', User.signinRequired, User.adminRequired, Type.list);


	// voteList 评论列表
	//app.get('/admin/voteList/new',User.signinRequired, User.adminRequired, Voted.new);
	// 加载——更新数据
	//app.get('/admin/voteList/update/:id', User.signinRequired, User.adminRequired, Voted.update);
	// 增加一个路由，处理post请求过来的数据
	app.post('/admin/voteList/save', User.signinRequired, VoteList.save);
	//app.get('/admin/voteList/list', User.signinRequired, User.adminRequired,  Voted.list);
	// 添加删除的路由
	//app.delete('/admin/voteList/list', User.signinRequired, User.adminRequired, Voted.delete);

	//接入微信
	/*
	app.use('/wechat', wechat(config.token, wechat.text(function (info, req, res, next) {
	  if (info.Content === 'list') {
	    res.wait('view'); // view is the very waiter we setuped before.
	  } else {
	    res.reply('hehe');
	    // or stop the waiter and quit.
	    // res.nowait('hehe');
	  }
	})));
	*/
	//removeMenu
	app.use('/removeMenu', wechat(config, function(req, res, next){
	    api.removeMenu(function(err, result){console.log('removeMenu result===='+JSON.stringify(result))});
	}));

	app.use('/createMenu', wechat(config, function(req, res, next){
	    var menu = fs.readFileSync('./config/menu.json');
	    if(menu) {
	      menu = JSON.parse(menu);
	      console.log("菜单为："+JSON.stringify(menu));
	    }  
	    api.createMenu(menu, function(err, result){console.log('createMenu result===='+JSON.stringify(result))});
	}));

	app.use('/weixin',wechat(config, function(req, res, next){
	    var menu = fs.readFileSync('./config/menu.json');
	    if(menu) {
	      menu = JSON.parse(menu);
	      console.log("菜单为："+JSON.stringify(menu));
	    }  
	    api.createMenu(menu, function(err, result){console.log('weixin result===='+JSON.stringify(result))}); 
	  	
	    // 微信输入信息都在req.weixin上
	    var message = req.weixin;
	    var msgType = message.MsgType;
	    //message.forEach(function(item){console.log(item)});
	    console.log("\nmessage.ToUserName========"+message.ToUserName,"\nmessage.FromUserName========"+message.FromUserName,"\nmessage.CreatTime========"+message.CreatTime,"\nmessage.Event========"+message.Event,"\nmessage.EventKey========"+message.EventKey,'\nmsgType=========='+msgType);
	    console.log("\nreq====>"+req,"\nres====>"+res);
	    // console.log("\nnext====>"+next);
	    if(msgType == 'event'){ 
			var eventType = message.Event;  
			if(eventType) { 
				eventType = eventType.toLowerCase();  
			}
			if(eventType == 'view'){
				//进入页面
				if(message.EventKey){
				//res.redirect(message.EventKey);
				}
			}else if(eventType == 'subscribe') {
				// 新用户关注/订阅事件 
				subscribeEvent(res);
			}else if(eventType == 'click') {
				clickEvent(message, res);
			}else {
				notFoundEvent(eventType, res);
			}
      	}else if(msgType == 'text'){
      		responseText(message,res);
      	}
      	

	}));

	app.use('/getMenu',function(req, res){
		api.getMenu(function(err, result){
			console.log(JSON.stringify(result));
		});
	});

	function subscribeEvent(res){
		console.log('您点击了关注'+res);
	}
	function clickEvent(message, res){
		console.log('clickEvent==============message\n',message.EventKey);
		// 音乐
		if(message.EventKey == 'V1001_TODAY_MUSIC'){
			res.reply({
				type:'music',
				title: "演员-薛之谦",
				description: "在线歌曲测试[黄常锦]",
				musicUrl: "http://win.web.rf01.sycdn.kuwo.cn/resource/n1/78/39/495851287.mp3",
				// hqMusicUrl: "http://music.163.com/"
			});
		}
		// 图文
		else if(message.EventKey == 'V1001_TODAY_MESSAGE'){
			//回复多条图文消息
			res.reply([{
				//msgtype:'news',
				title: "新消息",
				description: "获取新消息",
				title:'图1',
				picUrl: "http://www.chaohuitou.com/images/focus11.jpg",
				url: "http://www.chaohuitou.com/"
			},
			{
				//msgtype:'news',
				title: "新消息",
				description: "获取新消息",
				title:'图2',
				picUrl: "http://www.chaohuitou.com/images/focus11.jpg",
				url: "http://www.chaohuitou.com/"
			}]);
		}else{
			res.reply('正在全力开发中...\n'+'您点击了：'+message.EventKey);
		}

		//console.log('clickEvent==============res\n',res);
	}
	function notFoundEvent(eventType, res){
		console.log('notFoundEvent============eventType\n'+eventType);
		//console.log('notFoundEvent=================res\n'+res);
	}

	function responseText(message, res){
		res.reply(
			'这是一个自动回复的文字消息！测试[黄常锦]'
		);
	}



	
	

};
