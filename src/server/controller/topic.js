'use strict';
const Topic = require('../service/topic');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');

router.post('/api/topic/post', async (ctx) => {
    let reqPost = ctx.request.body
    console.log(reqPost)
    var topic = {
        user_id: reqPost.user_id,
        title: reqPost.title,
        content: reqPost.content
    };
    let res = await Topic.postOneBlog(topic);
    console.log(res);
    if(res) {
        ctx.body = {
            success: true
        }
    } else {
        ctx.body = {
            success: false
        }
    }
})

module.exports = router;