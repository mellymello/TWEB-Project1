/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pagenumber = require('./pageNumber.model');

exports.register = function(socket) {
  Pagenumber.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Pagenumber.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
	  socket.on('pageNumber', function (data) {
	//broadcasting the page number to all clients
	socket.broadcast.emit('pageNumber',data);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pageNumber:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pageNumber:remove', doc);
}