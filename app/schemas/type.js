var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 创建数据结构
var TypeSchema = new mongoose.Schema({
	name:String,
	voteds:[{type:ObjectId,ref:'Voted'}],
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
TypeSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
});

// 添加静态方法
TypeSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort({'meta.updateAt':-1})
			.exec(cb);
	},
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			.sort({'meta.updateAt':-1})
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
module.exports = TypeSchema;