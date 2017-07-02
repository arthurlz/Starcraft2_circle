const Koa = require('koa')

const router = require('koa-router')()
const json = require('koa-json')
const logger = require('koa-logger')
//   , auth = require('./server/routes/auth.js')
//   , api = require('./server/routes/api.js')
 const jwt = require('koa-jwt')
 const path =require('path')
 const serve = require('koa-static')
 //const historyApiFallback = require('koa-history-api-fallback');
const app = new Koa();


const user = require('./src/server/controller/user');
const match = require('./src/server/controller/match');
const topic = require('./src/server/controller/topic');
const reply = require('./src/server/controller/reply');
app.use(require('koa-bodyparser')());
//app.use(require("koa-better-body")())
app.use(json());
app.use(logger());


app.use(user.routes(), user.allowedMethods())
//app.use("/api",jwt({secret: 'blissful'}),user.routes())
app.use(match.routes(), match.allowedMethods())
app.use(topic.routes(), topic.allowedMethods())
app.use(reply.routes(), reply.allowedMethods())
app.on('error', function(err, ctx){
    
  console.log('server error', err);
});


//app.use(koa.routes()); // 将路由规则挂载到Koa上。
//app.use(historyApiFallback());
app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.listen(9112,() => {
  console.log('Koa is listening in 9112');
});

module.exports = app;