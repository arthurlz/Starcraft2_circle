const User = require('../models/user')
const bcrypt = require('bcryptjs');

exports.getOneUser = async(name) => {
    if(!name) {
        return [];
    }
    return await User.findOne({name:name});
}

exports.saveUser = async (user) => {
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

exports.UserSchema = User