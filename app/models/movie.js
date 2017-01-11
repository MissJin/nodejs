var mongoose = require('mongoose');

var MovieSchema = require('../schemas/movie');

var Movie = mongoose.model('Movie', MovieSchema);

// 导出模型
module.exports = Movie