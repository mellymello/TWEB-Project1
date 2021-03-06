'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
  sentBy: String,
  message: String,
  hour: String,
  lectureID: String
});

module.exports = mongoose.model('Chat', ChatSchema);