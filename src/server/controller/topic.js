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

router.get('/api/get_topics/', async (ctx) => {
    let auths = ctx.headers.authorization;
    if(auths) {
        const token = auths.split(' ')[1];
        if(token) {
            let topics = await Topic.getTopics();
            console.log(topics);
            ctx.body = topics;
        }else {
            ctx.body = {};
        }
    }
})

router.get('/api/:userid/topic/:uid', async (ctx) => {
    let userid= ctx.params.userid;
    let uid = ctx.params.uid;
    let auths = ctx.headers.authorization;
    console.log(userid)
    if(auths && userid && uid) {
        const token = auths.split(' ')[1];
        if(token) {
            let topics = await Topic.getUserTopic(userid,uid);
            ctx.body = topics[0];
        }else {
            ctx.body = {};
        }
    }
})

//udpate pv count
router.put('/api/updatePV/:userid/:uid', async (ctx) => {
    let userid= ctx.params.userid;
    let uid = ctx.params.uid;
    let auths = ctx.request.body.headers.Authorization;
    if(auths && userid && uid) {
        const token = auths.split(' ')[1];
        if(token) {
            console.log('this is put')
            let topics = await Topic.updatePV(userid,uid);
            console.log(topics);
            ctx.body = {ok:true}
        }else {
            ctx.body = {};
        }
    }
})

router.get('/api/getTopicTitles/:userid', async (ctx) => {
    let userid= ctx.params.userid;
    let auths = ctx.headers.authorization;
    if(auths && userid) {
        const token = auths.split(' ')[1];
        if(token) {
            console.log('this is put')
            let titles = await Topic.getTitles(userid);
            console.log(titles);
            ctx.body = titles
        }else {
            ctx.body = {};
        }
    }
})

module.exports = router;