'use strict';

var _ = require('lodash');
var Lesson = require('./lesson.model');

// Get list of lessons
exports.index = function(req, res) {
  Lesson.find(function (err, lessons) {
    if(err) { return handleError(res, err); }
    return res.json(200, lessons);
  });
};

// Get a single lesson
exports.show = function(req, res) {
  Lesson.findById(req.params.id, function (err, lesson) {
    if(err) { return handleError(res, err); }
    if(!lesson) { return res.send(404); }
    return res.json(lesson);
  });
};

// Creates a new lesson in the DB.
exports.create = function(req, res) {
  Lesson.create(req.body, function(err, lesson) {
    if(err) { return handleError(res, err); }
    return res.json(201, lesson);
  });
};

// Updates an existing lesson in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Lesson.findById(req.params.id, function (err, lesson) {
    if (err) { return handleError(res, err); }
    if(!lesson) { return res.send(404); }
    var updated = _.merge(lesson, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lesson);
    });
  });
};

// Deletes a lesson from the DB.
exports.destroy = function(req, res) {
  Lesson.findById(req.params.id, function (err, lesson) {
    if(err) { return handleError(res, err); }
    if(!lesson) { return res.send(404); }
    lesson.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}