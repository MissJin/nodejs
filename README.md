【设计者：黄常锦 			】
【邮  箱：1476932600@qq.com 】
【github:https://github.com/MissJin】
###启动系统流程:
1、==========================================
>先启动mongose

cd mongose的安装bin目录

mongod --dbpath 数据库目录

再开一个命令窗：进入mongose安装目录

mongo

use votedb;

db.users.find().pretty();

db.users.update({mobile:'xxxx'},{$set:{role:11}});//修改权限

db.users.insert({条件字段},{新增字段});

db.users.remove({});//删除集合中所有记录

db.users.remove({_id:ObjectId()});//删除单条记录

db.voteds.find().pretty();//被投票者

db.votelists.find().pretty();//投票列表

db.shutdownServer();//关闭服务

db.dropDatebase();//删除数据库（小心）


2、===============================================================
>启动系统

node app 或者 grunt

输入地址：http://localhost:2016访问首页


3、==============================================================
>微信的接入

npm install wechat wechat-api --save
或者

npm install wechat-koa --save

4、===============================================================
>PC端的浏览效果图

![github](https://github.com/MissJin/nodejs/blob/master/PC%E6%B5%8F%E8%A7%88%E6%95%88%E6%9E%9C.png "github")

>手机端的浏览效果

![github](https://github.com/MissJin/nodejs/blob/master/%E6%89%8B%E6%9C%BA%E7%AB%AF%E6%95%88%E6%9E%9C.png "github")

>接入微信端的效果

![github](https://github.com/MissJin/nodejs/blob/master/%E5%BE%AE%E4%BF%A1%E7%AB%AF%E6%95%88%E6%9E%9C.png "github")

![github](https://github.com/MissJin/nodejs/blob/master/%E5%BE%AE%E4%BF%A1%E7%AB%AF%E6%95%88%E6%9E%9C1.png "github")

>关注微信，查看微信端的效果

![github](http://mmbiz.qpic.cn/mmbiz_jpg/DyHgJsmmicL0ymt9TeekGb5mcPgdibdt0K1AKzib2KuRuztWKCuTlIvzCUzcfe9YFkJUQ2Ahx6zH15SNPnAfQeDuw/0 "github")


