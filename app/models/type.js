var mongoose = require('mongoose');

var TypeSchema = require('../schemas/type');

var Type = mongoose.model('Type', TypeSchema);

// 导出模型
module.exports = Type