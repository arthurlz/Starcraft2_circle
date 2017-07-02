'use strict';
const mongoose = require('./db');
const Schema   = mongoose.Schema;

const TopicSchema = new mongoose.Schema({
  //poster : { type: Schema.Types.ObjectId, ref: 'User' },
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
      required : false, //click counts
      default : 0
  },
  reply_count: {
    type: Number,
    required : false,
    default : 0
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
    type: String,
    required: false
  }
  ,
  last_reply_date_time: {
    type: Date,
    required: false
  },
  create_time: {
    type: Date,
    required: false,
    default: Date.now
  }
});


module.exports = mongoose.model('Topic',TopicSchema);
