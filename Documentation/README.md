Technical Documentation
=======================

# Scaffolding :

* Yeoman
* Angular-fullstack
* Grunt
* Express
* Bower
* Mongoose

# Sequence Diagram :

![](./followSlide_sequence_diagram.png "Next Button Diagram")

# Technologies Used :

* Node.js

* AngularJS

  We used AngularJS during our project. It helped us to manipulate the DOM. For example in the chat features, each message is recupered via SocketIO and then inserted in an array. Finally Angular is used to look over the array and display each messages in a bulleted list.
  
  Controller :
  ```
  socket.socket.on('chat_msg', function (msg) {
      if (msg.lectureID === lecture_id) {
        $scope.msgReceived.push(msg);
      }
    });
  ```
  View :
  
  ```
   ul(ng-repeat='m in msgReceived', ng-init="scroll()")
      li.active
        p  {{m.hour}} &nbsp &nbsp {{m.sentBy}}: {{m.message}}
  ```

* PDFJS
 
We used PDFJS to display the pdf in the website.

  ```
var pdfDoc = null,
        pageNum = $scope.currentLecture.actualPage,
        pageRendering = false,
        pageNumPending = null,
        scale = 0.8,
        canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d');

      /**
       * Get page info from document, resize canvas accordingly, and render page.
       * @param num Page number.
       */
      function renderPage(num) {
        if (pdfDoc == null) {
          return;
        }
        pageRendering = true;
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function (page) {
          var viewport = page.getViewport(scale);
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          var renderTask = page.render(renderContext);

          // Wait for rendering to finish
          renderTask.promise.then(function () {
            pageRendering = false;
            if (pageNumPending !== null) {
              // New page rendering is pending
              renderPage(pageNumPending);
              pageNumPending = null;
            }
          });
        });
      }

      /**
       * If another page rendering in progress, waits until the rendering is
       * finised. Otherwise, executes rendering immediately.
       */
      function queueRenderPage(num) {
        if (pageRendering) {
          pageNumPending = num;
        } else {
          renderPage(num);
        }
      }
      /**
       * Asynchronously downloads PDF.
       */
      PDFJS.getDocument(pdfUrl).then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page_count').textContent = pdfDoc.numPages;

        // Initial/first page rendering
        renderPage(pageNum);
      });
  ```

* Socket.IO 

Socket.io was very useful to send message between the pages. Thanks to this techno we could send chat message, page number,...

It easy to use with our environnement. On the server side we specifiy the type (name) of the messages and which functions we want. (on, emit, broadcast,...). Then on the client side you can use the "emit" and "on" function to send and receive messages.

Server :
  ```
  socket.on('chat_msg', function (data) {
    //broadcasting the message to all clients
    socket.broadcast.emit('chat_msg',data);
  });
  ```
Client : 
  ```
        socket.socket.emit('chat_msg', {
        sentBy: Auth.getCurrentUser().name,
        message: $scope.chatMsg,
        hour: getTime(),
        lectureID: $scope.lecture_id
      });
  ```

* Amazon aws S3

Amazon is used to store the PDFs. It allows us to specify CORS rules and it's free.
To implement this solution we had to do two mains things. First we had to configure our bucket (directory in S3). We had to allows users to upload and get the pdf. To do so we wrote a bunch of rules

Cors rules :
  ```
  <?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <ExposeHeader>x-amz-server-side-encryption</ExposeHeader>
        <ExposeHeader>x-amz-server-request-id</ExposeHeader>
        <ExposeHeader>x-amz-id-2</ExposeHeader>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
  ```
  
  Policy :
  ```
  {
	"Version": "2008-10-17",
	"Id": "Policy1417452172096",
	"Statement": [
		{
			"Sid": "Stmt1417452168825",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::tweb-pdf/*"
		},
		{
			"Sid": "Stmt1418054527654",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::074305860121:user/public_user"
			},
			"Action": "s3:PutObject",
			"Resource": "arn:aws:s3:::tweb-pdf/*"
		}
	]
}
  ```
  
  Secondly we had to write the function to upload the pdf.
  
  ```
  .
  .
  .
    // Configure The S3 Object
      AWS.config.update({
        accessKeyId: $scope.creds.access_key,
        secretAccessKey: $scope.creds.secret_key
      });
      AWS.config.region = 'eu-west-1';
      var bucket = new AWS.S3({
        params: {
          Bucket: $scope.creds.bucket
        }
      });
      .
      .
      .
       bucket.putObject(params, function (err, data) {
      if (err) {
        // There Was An Error With Your S3 Config
        alert("There is a problem uploading the pdf on Amazon S3...please try again :-(");
        console.log(err.message);
        return false;
      } else {
        // Success!
            .
            .
            .
      
  ```
  
  
  
* Heroku

# Issues : 
 * ...
 * ...
 * ...
 * ...

