'use strict';
const User = require('../service/user');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const upload = require('../common/upload')

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

    if(!res) {
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
})

router.get('/api/user/:userid', async (ctx) => {
    //console.log(ctx.headers);
    let userid= ctx.params.userid;
    let auths = ctx.headers.authorization;
    console.log(userid)
    if(auths && userid) {
        const token = auths.split(' ')[1];
        if(token) {
            let user = jwt.verify(token, 'blissful');
            console.log(user)
            let userInfo = await User.getOneUser(userid);
            ctx.body = userInfo;
        }else {
            ctx.body = {};
        }
    }
})

router.get('/api/auth', async (ctx) => {
    //console.log(ctx.headers);
    let auths = ctx.headers.authorization;
    if(auths) {
        const token = auths.split(' ')[1];
        if(token) {
            let user = jwt.verify(token, 'blissful');
            console.log(user)
            let userInfo = await User.getOneUser(user.name);
            ctx.body = userInfo;
        }else {
            ctx.body = {};
        }
    }
})

router.post('/api/signin', async (ctx) => {
    let userInfo = ctx.request.body;
    console.log('1231312');
    console.log(userInfo);
    if(userInfo) {
        let res = await User.getOneUser(userInfo.name);
        console.log(res.password)
        if( bcrypt.compareSync(userInfo.password,res.password)) {
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


router.post('/api/user/update', async (ctx) => {
    let auths = ctx.headers.authorization;
    if(auths) {
        let userInfo = ctx.request.body;
        console.log(userInfo)
        const token = auths.split(' ')[1];
        if(token) {
            let user = jwt.verify(token, 'blissful');
            console.log(user)
            let result = await User.update({name:user.name},userInfo);
            console.log(result);
            ctx.body = {
                result
            };
        }else {
            ctx.body = {};
        }
    }
})

router.post('/api/upload/avatar', async (ctx) => {
    let result = {};
    let serverFilePath = path.join( __dirname, '../','upload-files' )
    result = await upload.uploadFile(ctx,{
      fileType: 'album', // common or album
      path: serverFilePath
    });
    ctx.body = {
        result
    }
})

router.get('/api/get_cur_user', async (ctx) => {
    let auths = ctx.headers.authorization;
    if(auths) {
        const token = auths.split(' ')[1];
        if(token) {
            let user = jwt.verify(token, 'blissful');
            ctx.body = user;
        }else {
            ctx.body = {};
        }
    }
})
module.exports = router;