'use strict';
var mongoose = require('./db');

const Topic = new mongoose.Schema({
  user_id: {
      type : String,
      required : true
  },
  title: {
      type : String,
      required : true
  },
  content: {
      type : String
  },
  pv: {
      type : Number,
      required : false
  },
  reply_count: {
    type: Number,
    required : false
  },
  allow_comment: {
    type: Number,
    required : false
  },
  is_public: {
    type: Number,
    required : false
  },
  last_reply_id: {
    type: Number,
    required: false
  }
  ,
  last_reply_date_time: {
    type: Date,
    required: false
  }
});


module.exports = Topic;
