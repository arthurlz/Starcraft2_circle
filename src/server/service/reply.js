const Reply = require('../models/reply')
const User = require('./user');

exports.postReply = async(reply) => {
    if(!reply) {
        return {};
    }
    let {user_id,topic_id,content} = reply;
    let replyEntity = new Reply({user_id,topic_id,content});
    return await replyEntity.save(reply);
}

exports.getReplies = async (cid) => {
    let users = await User.UserSchema.find({}, ['name','avatarUrl']);
    let replies = await Reply.find({topic_id: cid}).sort({ create_time: 1 }).lean();
    let newReplies = replies;
    newReplies.forEach((e,i,a) => {
        let union = users.filter((ue,ui,ua) => {
            return ue.name === e.user_id;
        })
        newReplies[i].avatarUrl = union[0].avatarUrl;
    });
    console.log('asdghaodhasodoa')
    console.log(newReplies);
    return newReplies;  
}

exports.updatePV = async(user, _id) => {
    let topics = await Topic.update({user_id: user, _id},{$inc: { pv: 1 }});
    return topics;
}