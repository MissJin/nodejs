var mongoose = require('mongoose');
// var Promise = require('mpromise');
// mongoose.connect('mongodb://localhost:27017/votedb');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 创建数据结构
var VotedSchema = new mongoose.Schema({
	title:{
		type:String
	},
	name:{
		type:String
	},
	image:String,
	summary:String,
	total:{
		type:Number,
		default:0
	},
	type:{type:ObjectId, ref:'type'},
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
VotedSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
});

// 添加静态方法
VotedSchema.statics = {
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
module.exports = VotedSchema;