'use strict';
const User = require('../service/user');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

router.post('/api/signup', async (ctx) => {
    console.log(typeof ctx.request.body);
    let userInfo = ctx.request.body;
    let res = await User.getOneUser(userInfo.name);
    //let ok = await bcrypt.compare(userInfo.password, res.password);
    console.log(res);

    if(res) {
        console.log(userInfo);
        let ok = await User.saveUser(userInfo);
        console.log(ok);
        if(ok) {
            const userToken = {
                name: userInfo.name
            }
            const secret = 'blissful'; // 指定密钥
            const token = jwt.sign(userToken,secret); // 签发token
            ctx.body = {
                success: true,
                token: token // 返回token
            }
        } else {
            ctx.body = {
                success: false,
                token: '' // 返回token
            }
        }

    }
    
    // var user = new User({
    //   name: 'lita',
    //   password: 'lita',
    //   email: 'lita@gmail.com',
    //   gender: 'M',
    //   signature: 'cool',
    //   personalWeb: 'litacheng.me',
    //   GitHub: 'loveppears',
    //   avatarUrl: 
    //       'http://res.cloudinary.com/hezf/image/upload/v1467186691/vwuj8a3tpuqoy5fzuzlw.png'
    //   ,
    //   integration: '1'
    // });
    // user.save(function (err, res) {
    //     if (err) {
    //         console.log("Error:" + err);
    //     }
    //     else {
    //         console.log("Res:" + res);
    //     }

    // });
})


router.post('/api/auth', async (ctx) => {
    let a = ctx.request.body;
    console.log('1231312');
    console.log(a.token);
    if(a.token) {
        let user = jwt.verify(a.token, 'blissful');
        ctx.body = user;
    }else {
        ctx.body = {};
    }

})

router.post('/api/signin', async (ctx) => {
    let userInfo = ctx.request.body;
    console.log('1231312');
    console.log(userInfo);
    if(userInfo) {
        let res = await User.getOneUser(userInfo.name);
        if(res.password == userInfo.password) {
            const userToken = {
                name: res.name
            }
            console.log(res);
            const secret = 'blissful'; // 指定密钥
            const token = jwt.sign(userToken,secret); // 签发token
            ctx.body = {
                success: true,
                token: token // 返回token
            }
        }else {
            ctx.body = {};
        }
    }else {
        ctx.body = {};
    }

})

module.exports = router;