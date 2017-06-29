'use strict';
const User = require('../service/user');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uploadCloud = require('cloudinary')
const config = require('../config/cloudinary');
uploadCloud.config(config)
const parse = require('await-busboy')
const asyncBusboy = require('async-busboy')

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

// const Topic = require('../service/topic');

// router.post('/api/topic/post', async (ctx) => {
//     let reqPost = ctx.request.body
//     console.log(reqPost)
//     var topic = {
//         user_id: reqPost.user_id,
//         title: reqPost.title,
//         content: reqPost.content
//     };
//     let res = await Topic.postOneBlog(topic);
//     console.log(res);
// })

 async function upload(path) {
  return new Promise(function (resolve, reject) {
    cloudinary.uploader.upload(path, function (result) {
      console.log(result);
      //异步删除下载的图片文件,这里假设不只有一个文件
      fs.readdir('./uploads', (err, files)=> {
        if (err) {
          console.error(err);
        }
        for (let fileName of files) {
          //删除除了说明文件的所有文件，也就是这里的图片缓存
          if(fileName!=='readme.md'){
            fs.unlink('./uploads/' + fileName, (err)=> {
              if (err) {
                console.error(err);
              }
            });
          }
        }
      });

      //传出上传结果
      resolve(result);
    });
  });
}

router.post('/api/upload/avatar', async (ctx) => {
    let img = ctx.request.body;
    //console.log(ctx.request.body.files.file);
    //console.log(ctx.request.is('multipart/*'));
    const {files, fields} = await asyncBusboy(ctx.req);
    console.log(files.path);
    console.log(fields);
    // const {fields} = await asyncBusboy(ctx.req, {
    //     onFile: function(fieldname, file, filename, encoding, mimetype) {
    //         console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    //     }
    // });
    // if(img) {
    //     console.log(ctx.body)
    // }else {
    //     ctx.body = {};
    // }

})
module.exports = router;