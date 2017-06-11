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


const User =require('./src/server/models/user');
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

// app.use(async (next) => {
//   let start = new Date;
//   yield next;
//   let ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });

// app.use(async (next) => {  //  如果JWT验证失败，返回验证失败信息
//   try {
//     yield next;
//   } catch (err) {
//     if (401 == err.status) {
//       this.status = 401;
//       this.body = {
//         success: false,
//         token: null,
//         info: 'Protected resource, use Authorization header to get access'
//       };
//     } else {
//       throw err;
//     }
//   }
// });
// app.use( async ( ctx ) => {
//   ctx.body = "12312"
// })

router.get('/api/fuck', async (ctx) => {
    ctx.body = 'hello guru'
    var user = new User({
      name: 'lita',
      password: 'lita',
      email: 'lita@gmail.com',
      gender: 'M',
      signature: 'cool',
      personalWeb: 'litacheng.me',
      GitHub: 'loveppears',
      avatarUrl: 
          'http://res.cloudinary.com/hezf/image/upload/v1467186691/vwuj8a3tpuqoy5fzuzlw.png'
      ,
      integration: '1'
    });
    user.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
})

app.use(router.routes(), router.allowedMethods())

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