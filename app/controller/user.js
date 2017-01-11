// 放用户的路由
var User = require('../models/user');//拿到模型

exports.showSignin=function(req, res){
	res.render('signin',{
		title:'登入页面'
	})
};

exports.showSignup=function(req, res){
	res.render('signup',{
		title:'注册页面'
	})
};

exports.signup=function(req, res){
	var userObj = req.body.user;
	console.log(userObj);
	User.findOne({mobile:userObj.mobile}, function(err, user){
		if(err){
			console.log(err)
		}
		if(user){
			res.redirect('/signin')
		}else{			
			user = new User(userObj);
			user.save(function(err, user){
				if(err){console.log(err)};
				console.log('注册成功！',user)
				res.redirect('/');
			});
		}

	});

	
};

exports.signin=function(req, res){
	var userObj = req.body.user;
	var name = userObj.name;
	var mobile = userObj.mobile;
	var password = userObj.password;

	User.findOne({mobile:mobile},function(err, user){
	// User.findByName(name,function(err, user){
		if(err){console.log(err)}
		if(!user){			
			return res.redirect('/signup');
		}
		user.comparePassword(password, function(err, isMatch){
			if(err){console.log(err)};
			if(isMatch){
				console.log('is matched');
				req.session.user = user;
				res.redirect('/');
			}else{
				console.log('not matched');
				res.redirect('/signin');
			}
		})
	})	
};

exports.logout=function(req, res){
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/');
};

//权限的控制
exports.signinRequired = function(req, res, next){
	var user = req.session.user;
	if(!user){
		return res.redirect('/signin');
		//res.send('/','sorry, we cannot find that!');
	}
	next();
}

exports.adminRequired = function(req, res, next){
	var user = req.session.user;
	if(!user){
		return res.redirect('/');
	}
	if(user.role <=10){
		console.log('权限不够！');
		return res.redirect('/');
	}
	next();
}


