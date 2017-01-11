var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var port = process.env.PORT || 2016;

var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
//对post 的数据格式化
app.use(bodyParser.json());
//告诉浏览器，静态文件到哪个目录找
app.use(express.static(path.join(__dirname, 'bower_components')));

//app.set('port', 2016);
app.listen(port);

console.log('您正在使用的端口号为：'+port);

//路由
app.get('/', function(req, res){
	res.render('index',{
		title:'电影首页',
		movies:[
			{
			title:'最后的巫师猎人',
			_id:1,
			poster:'http://r1.ykimg.com/050E0000568231DE67BC3C3A0203D5A2'
			},
			{
			title:'最后的巫师猎人',
			_id:2,
			poster:'http://r1.ykimg.com/050E0000568231DE67BC3C3A0203D5A2'
			}

		]
	})
});

app.get('/movie/:id', function(req, res){
	res.render('detail',{
		title:'电影详情页',
		movie:{
			title:'最后的巫师猎人',
			doctor:'布瑞克·埃斯纳尔',
			language:'中文',
			country:'美国',
			year:'2016-02-16',
			poster:'http://r1.ykimg.com/050E0000568231DE67BC3C3A0203D5A2',
			flash:'http://js.tudouui.com/bin/lingtong/PortalPlayer_196.swf',
			// flash:'http://www.w3school.com.cn/i/movie.mp4',
			summary:'作为世界上最后一个女巫猎人，考尔德（范·迪塞尔饰）被黑巫后诅咒，得到了不死之身。如今，考尔德寄居在纽约的一所教堂，与教会派来的第37代多兰（伊利亚·伍德饰）联手斩妖除魔。与此同时，黑巫后得到秘术即将复活，邪恶女巫们倾巢而出，企图释放超级瘟疫灭绝人类。势单力薄的考尔德，求助于善良的梦之女巫克洛伊（露丝·莱斯利饰），在她的帮助下，考尔德与邪恶女巫之间的终极之战一触即发。他们齐力阻挡纽约城的女巫势力毁灭人类，这一切又将如何收场？'
		}
	})
});

app.get('/admin/movie', function(req, res){
	res.render('admin',{
		title:'电影后台页',
		movie:{
			title:'',
			doctor:'',
			language:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:''
		}
	})
});


app.get('/admin/list', function(req, res){
	res.render('list',{
		title:'电影列表页',
		movies:[{
			title:'最后的巫师猎人',
			_id:1,
			doctor:'布瑞克·埃斯纳尔',
			language:'中文',
			country:'美国',
			year:'2016-02-16',
			poster:'http://r1.ykimg.com/050E0000568231DE67BC3C3A0203D5A2',
			flash:'http://js.tudouui.com/bin/lingtong/PortalPlayer_196.swf',
			summary:'作为世界上最后一个女巫猎人，考尔德（范·迪塞尔饰）被黑巫后诅咒，得到了不死之身。如今，考尔德寄居在纽约的一所教堂，与教会派来的第37代多兰（伊利亚·伍德饰）联手斩妖除魔。与此同时，黑巫后得到秘术即将复活，邪恶女巫们倾巢而出，企图释放超级瘟疫灭绝人类。势单力薄的考尔德，求助于善良的梦之女巫克洛伊（露丝·莱斯利饰），在她的帮助下，考尔德与邪恶女巫之间的终极之战一触即发。他们齐力阻挡纽约城的女巫势力毁灭人类，这一切又将如何收场？'
		}]
	})
});




















