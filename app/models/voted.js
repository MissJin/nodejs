var mongoose = require('mongoose');

var VotedSchema = require('../schemas/voted');

var Voted = mongoose.model('Voted', VotedSchema);

// 导出模型
module.exports = Voted;