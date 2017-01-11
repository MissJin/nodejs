var mongoose = require('mongoose');
// var Promise = require('mpromise');
// mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 创建数据结构
var MovieSchema = new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	flash:String,
	poster:String,
	year:String,
	summary:String,
	category:{type:ObjectId, ref:'Category'},
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
MovieSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
});

// 添加静态方法
MovieSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort({'meta.updateAt':-1})
			.exec(cb);
	},
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			.sort('meta.updateAt')
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
module.exports = MovieSchema;