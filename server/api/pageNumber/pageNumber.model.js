'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PagenumberSchema = new Schema({
  pageNumber: String
});

module.exports = mongoose.model('Pagenumber', PagenumberSchema);