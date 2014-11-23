'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LectureSchema = new Schema({
  //je pense que l'id serait égal au nom du pdf 
  id: Number
  title: String,
  description: String,
  creationDate: String,
  professorID: Object,
  pdfFile: String,
  actualPage: Number
});

module.exports = mongoose.model('Lecture', LectureSchema);