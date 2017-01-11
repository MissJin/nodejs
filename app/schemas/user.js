var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); //数据加密
var Salt_work_factor = 10; //加盐的复杂度

// 创建数据结构
var UserSchema = new mongoose.Schema({
	name:{
		/*unique:true,*/
		type:String
	},
	mobile:{
		unique:true,
		type:String
	},
	password:String,
	head_icon:String,
	/*
	0:正常用户
	1：验证过的用户
	2：高级用户
	>10:admin
	>50:superadmin
	*/
	role:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}


	}
});


// 每次调用前，判断更新哪个时间
UserSchema.pre('save', function(next){
	var user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	};
	//密码加密
	bcrypt.genSalt(Salt_work_factor, function(err, salt){
		if(err) {
			return next(err);
		};
		bcrypt.hash(user.password, salt,null, function(err, hash){
			if(err) {return next(err);};
			user.password = hash;
			next();
		});
	});

});

// 实例方法
UserSchema.methods = {
	comparePassword: function(password, cb){
		bcrypt.compare(password, this.password, function(err, isMatch){
			if(err){return cb(err)}
			return cb(null,isMatch);
		})
	}
} 

// 添加静态方法
UserSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findByName: function(name, cb){
			return this
			.findOne({name: name})
			.exec(cb);
	}
	/*,
	remove: function(id, cb){
		return this
			.remove({_id: id})
			.exec(cb);
	}*/

}

// 导出模式
module.exports = UserSchema;