var mongoose = require('./db');

const UserSchema = new mongoose.Schema({
    name: {
      type : 'String',
      required : true
    },
    password: {
      type : 'String',
      required : true
    },
    email: {
      type : 'String'
    },
    gender: {
      type: 'String'
    },
    signature: {
      type: 'String'
    },
    personalWeb: {
      type: 'String'
    },
    GitHub: {
      type: 'String'
    },
    avatarUrl: {
      type: 'String',
      default: 'http://res.cloudinary.com/hezf/image/upload/v1467186691/vwuj8a3tpuqoy5fzuzlw.png'
    },
    integration: {
      type: 'String',
      required : true,
      default: 0
    }
});

// UserSchema.pre('save', function (next) {
//     if (this.isNew) {
//         this.meta.createAt = this.meta.updateAt = Date.now();
//     } else {
//         this.meta.updateAt = Date.now();
//     }
//     next();
// });

// UserSchema.statics = {
//     fetch: function (cb) {
//         return this
//             .find({})
//             .sort('meta.updateAt')
//             .exec(cb);
//     },
//     findById: function (id, cb) {
//         return this
//             .findOne({_id: id})
//             .exec(cb);
//     }
// };

module.exports = mongoose.model('User',UserSchema);