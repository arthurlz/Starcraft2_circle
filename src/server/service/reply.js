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


//not yet
exports.getTopics = async () => {
    // if(!userid)  {
    //     return {};
    // }
    let users = await User.UserSchema.find({}, ['name','avatarUrl']);
    //console.log(users);
    let topics = await Topic.find({}).sort({ create_time: -1 }).lean();
    let newTopics = topics;
    topics.forEach((e,i,a) => {
        let union = users.filter((ue,ui,ua) => {
            return ue.name === e.user_id;
        })
        console.log(union[0].avatarUrl);
        newTopics[i].avatarUrl = union[0].avatarUrl;
    });
    console.log(newTopics);
    return newTopics;
}

exports.getUserTopic = async(user, _id) => {
    let topics = await Topic.find({user_id: user, _id}).lean();
    return topics;
}

exports.updatePV = async(user, _id) => {
    let topics = await Topic.update({user_id: user, _id},{$inc: { pv: 1 }});
    return topics;
}