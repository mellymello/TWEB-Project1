'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
  studentName: String,
  lectureID: String,
  numPage: Number,
  note: String
});

module.exports = mongoose.model('Note', NoteSchema);