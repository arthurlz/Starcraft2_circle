const Topic = require('../models/topic')
const bcrypt = require('bcryptjs');

exports.postOneBlog = async(topic) => {
    if(!topic) {
        return {};
    }
    let {user_id,title,content} = topic;
    console.log(topic);
    let topicEntity = new Topic({user_id,title,content});
    return await topicEntity.save(topic);
}

exports.getTopic = async (user) => {
    if(!user)  {
        return {};
    }
    let password = await bcrypt.hash(user.password, 12);
    console.log(password);
    let UserEntity = new User({
        name : user.name,
        password : password,
        email : 'litar929@gmail.com'
    });
    return await UserEntity.save(user);
}

exports.update = async(conds, user) => {
    return await User.update(conds, user);
}