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

module.exports = router;