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
 
  ```
  Insert code here
  ```

* Socket.IO 

  ```
  Insert code here
  ```

* Amazon aws S3

  ```
  Insert code here
  ```
* Heroku

# Issues : 
 * ...
 * ...
 * ...
 * ...

