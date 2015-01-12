'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  name: String,
  lessonRelevance: String,
  nbrStudentsLost: Number,
  nbrStudentRecovered: Number,
  lostStudentsName: String,
  recoveredStudentsName: String,
  globalLostStudents: String,
  mood : Number,
  pageNumber: Number,
  lectureID: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);