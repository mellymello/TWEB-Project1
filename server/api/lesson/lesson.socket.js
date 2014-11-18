/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lesson = require('./lesson.model');

exports.register = function(socket) {
  Lesson.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lesson.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lesson:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lesson:remove', doc);
}