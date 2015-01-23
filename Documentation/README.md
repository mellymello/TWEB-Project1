Technical Documentation
=======================

This documentation will help you to understand how the project is working and how you can modify/add some features.

# Introduction :

The first things we can say about the project is that we have learned a lot of new, cool and really actual features for the web developers.

In this first section of the technical documentation we are going to give an overview of all technologies we have seen, learned and used for the project.

Before starting with technical stuff we want to say that this project showed us a new way of developing and a new way to share the work with colleague. The project was funny and the idea of the “web learning” platform is cool and useful idea in a real world.

Now let’s see in more details what we have used during the project.


# Development Pipeline :

At the base of our Development pipeline we have used Yoeman.
![](./img/yoeman.png "Yo logo")

Yoeman is a set of very useful tools that allow us to have an automated workflow for the project. In addition, Yoeman will allow us to manage the structure of our project easily.
The next component of our development pipeline is the Angular fullstack generator. This component it’s a Yoeman “plugin” that will allow us to scaffold a project skeleton. This is very useful because it will generate for us all the basic component of the website and also keep them in a well ordered and clean directory structure

Overview

    ├── client
    │   ├── app                 - All of our app specific components go in here
    │   ├── assets              - Custom assets: fonts, images, etc…
    │   ├── components          - Our reusable components, non-specific to to our app
    │
    ├── e2e                     - Our protractor end to end tests
    │
    └── server
        ├── api                 - Our apps server api
        ├── auth                - For handling authentication with different auth strategies
        ├── components          - Our reusable or app-wide components
        ├── config              - Where we do the bulk of our apps configuration
        │   └── local.env.js    - Keep our environment variables out of source control
        │   └── environment     - Configuration specific to the node environment
        └── views               - Server rendered views

An example client component in `client/app`

    main
    ├── main.js                 - Routes
    ├── main.controller.js      - Controller for our main route
    ├── main.controller.spec.js - Test
    ├── main.html               - View
    └── main.less               - Styles

An example server component in `server/api`

    thing
    ├── index.js                - Routes
    ├── thing.controller.js     - Controller for our `thing` endpoint
    ├── thing.model.js          - Database model
    ├── thing.socket.js         - Register socket events
    └── thing.spec.js           - Test
    
One more reason we have chosen to use the Angular fullstack generator, it’s because it is designed to include a lot of tool that we need for our project (Node.js, MongoDB, Socket.io, Express, …)
At this point we already have 2 component of the developing chain. Whit this 2 component we are able to easily manage the structure of the website.
The next component we will describe here is Bower.
![](./img/bower.png "Bower logo")

Bower is a package manager that allow us to automatically resolve dependencies for our project. It’s a very useful tool to have inside the development pipeline because it will save a lot of time for the developers. The main concept behind Bower is simple but really efficient. Based on a manifest file, bower.json, where the packages and the respective version number needed are specified, Bower will take care of downloading and installing them automatically for us.
At this point we have a lot of cool tools but we need one more component inside the pipeline:

![](./img/grunt.png "Grunt logo")

Grunt is like an “art director” that is able to run all the task we need to have our application built and deployed. Grunt is a task runner that with a simple file (Gruntfile.js) is able to automatize the whole building / serve process. We say that Grunt basically split its work on three phases:

* pre-processing (like calling bower to resolve dependencies)
* code analysis (Unit testing)
* code optimization

Once all “grunt build” work has been done, our application is actually built and ready to be served with the command “grunt serve” without the user has done a single task manually.

# Sequence Diagram :

![](./followSlide_sequence_diagram.png "Next Button Diagram")

# Technologies Used :

* __Node.js and Express__

Node.js is the server and express is a framework on Node.js. They allow us to use http request, They make the routes. Node.js forwards the messages from socket.io. They are the guy behind the scene. 

Here is an example of two http requests (GET and POST) :

 ```
 $http.get('/api/feedbacks').success(function (f) {
        for (var i = 0; i < f.length; i++) {
          if (f[i].lectureID == lecture_id && f[i].pageNumber == $scope.currentPageNumber) {
            $scope.currentFeedback = f[i];
          }
        }
        
 $http.post('/api/feedbacks', {
            name: null,
            lessonRelevance: $scope.relevance,
            nbrStudentsLost: 0,
            nbrStudentRecovered: 0,
            lostStudentsName: "",
            recoveredStudentsName: "",
            globalLostStudents: $scope.globalLostStudents,
            mood: $scope.generalMood,
            pageNumber: $scope.currentPageNumber,
            lectureID: lecture_id

          });
 ```

* __AngularJS__

  We used AngularJS during our project. It helped us to manipulate the DOM. For example in the chat features, each message is recupered via SocketIO and then inserted in an array. Finally Angular is used to look over the array and display each messages in a bulleted list.
  
  Controller :
  ```
  angular.module('twebEasyLearningApp')
  .controller('ProfviewCtrl', function ($scope, $http, socket, Auth, $location) {
    $scope.msgReceived = [];
  .
  .
  .
  
  socket.socket.on('chat_msg', function (msg) {
      if (msg.lectureID === lecture_id) {
        $scope.msgReceived.push(msg);
      }
    });
  ```
  
  As you can see you have a variable ``` $scope ``` that you can use in the whole module. It's really useful.
  Another thing to notice is the dependancy injection that you can do in the module.
  Here we injected some dependencies ( ``` $scope, $http, socket, Auth, $location ``` ) to be able to use some features like http request or location functions.
  
  View :
  
  ```
   ul(ng-repeat='m in msgReceived', ng-init="scroll()")
      li.active
        p  {{m.hour}} &nbsp &nbsp {{m.sentBy}}: {{m.message}}
  ```
  
  We also used ``` "ng-model" ``` as another tag
  
  It's a really good framework and it is a pleasure to work with it. You can really save some time if you use AngularJS

* __PDFJS__
 
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

* __Socket.IO__ 

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

* __Amazon aws S3__

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
  
 * __MongoDB & Mongoose__
 
 MongoDB is a NoSQL database, we use it to store the data. Mongoose is an elegant mongodb object modeling for node.js
 Mongoose provides a straight-forward, schema-based solution to modeling your application data and includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

 To modify the structure of the collections you just need to modify the model file in the server. 

 ```
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
 ```

We used also used Robomongo to look at and modify the database
  
* __Heroku__

Heroku is our cloud application platform. It's a Platform as a Service (PaaS). They offer us to run our application and give us an url to access it.

# Issues : 
 * Amazon -> Upload
  
 We had some troubles with amazon at the beginning. To solve them we spend some time on the documentation. We discovered that our first policies were wrong and once we corrected them it worked

 * Lecture isolation problem
 
 When you follow a lecture you dont want to see the message from the others lectures, or you don't want the number of the slide is incremented by another lecture. This was a problem that we didn't see at the beginning, this is after a while and some tests we discovered the problem. All the chats were linked and if a teacher from another lecture goes forward all the students from all lectures had their slide number moved forward too.

 We review our code and analyse the network traffic to solve this problem.

 * Feedback (concurency problem)
 
 This problem isn't solved yet. If many students give their feedbacks and "spam" the buttons the statistics are not correctly  formed. Some information is lost and it's difficult to understand what the data want to mean.

 * Screen resolution problem
  
 This problem isn't solved yet too. If you display the website on a projector you have to use the zoom feature from the       browser to adapt the size of the page. Otherwise the elements are a bit juxtaposed. 

 * Deployement on Heroku

 To solve this issue we analyzed the logs and review the code

