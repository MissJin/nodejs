var mongoose = require('mongoose');

var CommentSchema = require('../schemas/comment');

var Comment = mongoose.model('Comment', CommentSchema);

// 导出模型
module.exports = Comment