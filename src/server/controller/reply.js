'use strict';
const Reply = require('../service/reply');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');

router.post('/api/postReply/', async (ctx) => {
    let reply = ctx.request.body;
    if(reply) {
        console.log('this is reply')
        let res = await Reply.postReply(reply);
        console.log(res);
        if(res) {
            ctx.body = {ok:true}
        } else {
            ctx.body = {};
        }
    }
})

router.get('/api/getReplies/:cid', async (ctx) => {
    let cid = ctx.params.cid;
    let auths = ctx.headers.authorization;
    if(auths && cid) {
        const token = auths.split(' ')[1];
        if(token) {
            let replies = await Reply.getReplies(cid);
            ctx.body = replies;
        }else {
            ctx.body = {};
        }
    }
})
module.exports = router;