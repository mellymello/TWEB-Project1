/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lecture = require('./lecture.model');

exports.register = function(socket) {
  Lecture.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lecture.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  socket.on('pageNumber', function (data) {
  socket.broadcast.emit('pageNumber',data);
  });
  
}

function onSave(socket, doc, cb) {
  socket.emit('lecture:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lecture:remove', doc);
}