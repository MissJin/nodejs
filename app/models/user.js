var mongoose = require('mongoose');

var UserSchema = require('../schemas/user');

var User = mongoose.model('User', UserSchema);

// 导出模型
module.exports = User