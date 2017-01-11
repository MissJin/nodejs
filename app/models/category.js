var mongoose = require('mongoose');

var CategorySchema = require('../schemas/category');

var Category = mongoose.model('Category', CategorySchema);

// 导出模型
module.exports = Category