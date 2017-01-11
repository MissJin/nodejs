var mongoose = require('mongoose');

var VoteListSchema = require('../schemas/voteList');

var VoteList = mongoose.model('VoteList', VoteListSchema);

// 导出模型
module.exports = VoteList;