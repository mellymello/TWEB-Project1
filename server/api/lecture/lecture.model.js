'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LectureSchema = new Schema({
  title: String,
  description: String,
  creationDate: String,
  professorID: Object,
  pdfFile: String,
  actualPage: Number
});

module.exports = mongoose.model('Lecture', LectureSchema);