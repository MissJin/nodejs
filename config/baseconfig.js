// 配置文件
var baseconfig={
	dburl:'mongodb://localhost:27017/votedb',
	voteTime:5//每个帐号每天投票次数
};
module.exports = function(){
	return baseconfig;
};