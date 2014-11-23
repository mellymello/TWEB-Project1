/**
 * Main application routes
 */

'use strict';

//pdf upload

var multipart = require('connect-multiparty');


var fs = require('fs');
//

var errors = require('./components/errors');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/feedbacks', require('./api/feedback'));
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
  // https://github.com/andrewrk/node-multiparty/
  var multiparty = require('multiparty');
  var util = require('util');
  app.post('/upload', function (req, res) {
    var form = new multiparty.Form({
      autoFiles: false,
      uploadDir: './client/data'
    });
    form.parse(req, function (err, fields, files) {

      // error handling
      if (err) {
        res.writeHead(400, {
          'content-type': 'text/plain'
        });
        res.end("invalid request: " + err.message);
        return;
      }

      // get the file from folder and send feedback
      fs.readFile(files.file[0].path, function (err, file) {

        // send back a response
        res.writeHead(200, {
          'Content-type': ' text/plain'
        });
        
        //res.write('{"pdfPath": "' + files.file[0].path+'"}');
        res.write(files.file[0].path);      
        res.end();

      });


    });

  });
  //
};