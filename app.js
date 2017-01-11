var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');//对提交的数据格式化

var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoStore = require('connect-mongo')(session); //为了让数据持久化，引入connect-mongo

var logger = require('morgan');//日志：HTTP request logger middleware for node.js

var port = process.env.PORT || 2016;

var app = express();
var baseconfig = require('./config/baseconfig');

// 链接数据库
mongoose.connect(baseconfig().dburl);


app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }))
//对post 的数据格式化
app.use(bodyParser.json());
//告诉浏览器，静态文件到哪个目录找,没添加配置文件 .bowerrc的时候，默认是在 bower_components;现在改为：public
app.use(express.static(path.join(__dirname, 'public')));
// session 依赖 cookie
app.use(cookieParser());
// 引入session, 并用 mongoStore存储起来
app.use(session({
	secret:'hello',
	store: new mongoStore({
		url:baseconfig().dburl,
		collection:'session',
		ttl:10*60 //设置session失效时间
	})
}));

// 本地开发的配置【urL,请求信息，以及源码的格式化】
if('development' === app.get('env')){
	app.set('showStackError',true);
	app.use(logger('[:date[iso]] [:method] [:url] [:status] [:remote-addr] [:remote-user] [:res[content-length]]  [:response-time] ' ));//打印日志，调用方法，请求地址和状态
	app.locals.pretty = true; //源码格式化
	mongoose.set('debug',true);
}



// 调用本地的moment,用来格式化时间
app.locals.moment = require('moment');
// 1个帐号1天之内只能投票次数的
app.locals.voteTime = baseconfig().voteTime;

//app.set('port', 2016);
app.listen(port);

console.log('您正在使用的端口号为：'+port);

//对路由的引入
require('./config/routes')(app);






















