/**
 * Main application routes
 */

'use strict';

//pdf upload

var multipart = require('connect-multiparty');

var options = new Object();
options.uploadDir = './client/data';
var multipartMiddleware = multipart(options);
//

var errors = require('./components/errors');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/lectures', require('./api/lecture'));
  app.use('/api/chats', require('./api/chat'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function (req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });


  //pdf upload
  app.post('/upload', multipartMiddleware, function (req, resp) {
    console.log(req.body, req.files);
    // don't forget to delete all req.files when done
  });
  //
};