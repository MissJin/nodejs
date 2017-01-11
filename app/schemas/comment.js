var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
// 创建数据结构
var CommentSchema = new mongoose.Schema({
	movie:{type: ObjectId, ref: 'Movie'},
	from:{type: ObjectId, ref: 'User'},
	reply:[{
		from:{type: ObjectId, ref: 'User'},
		to:{type: ObjectId, ref: 'User'},
		content:String,
		createAt:{
			type:Date,
			default:Date.now()
		}
	}],
	content:String,
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
CommentSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
});

// 添加静态方法
CommentSchema.statics = {
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
	}
	/*,
	remove: function(id, cb){
		return this
			.remove({_id: id})
			.exec(cb);
	}*/

}

// 导出模式
module.exports = CommentSchema;