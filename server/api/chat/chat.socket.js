/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Chat = require('./chat.model');

exports.register = function(socket) {
  Chat.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Chat.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  
    socket.on('chat_msg', function (data) {
    //broadcasting the message to all clients
    socket.broadcast.emit('chat_msg',data);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('chat:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('chat:remove', doc);
}




