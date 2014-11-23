'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  lectureID: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);