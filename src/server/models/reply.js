'use strict';
const mongoose = require('./db');
const Schema   = mongoose.Schema;

const ReplySchema = new mongoose.Schema({
  user_id: {
      type : String,
      required : true
  },
  topic_id: {
      type : String,
      required : true
  },
  content: {
      type : String,
      required : true
  },
  support: {
      type : Number,
      required : false, //upvote counts
      default : 0
  },
  create_time: {
      type : Date,
      required: false,
      default: Date.now
  }
});


module.exports = mongoose.model('Reply',ReplySchema);
