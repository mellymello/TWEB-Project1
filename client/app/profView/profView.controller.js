'use strict';

angular.module('twebEasyLearningApp')
  .controller('ProfviewCtrl', function ($scope, $http, socket, Auth, $location) {
    $scope.msgReceived = [];
    $scope.relevance = '';
    $scope.stuName = [];
    $scope.nbrStuLost = 0;
    $scope.generalMood = 1;
    $scope.currentFeedback = null;

    $scope.currentPageNumber = 1;


    var lecture_id = $location.search().lecture_id;

    function getCurrentFeedback() {
      $scope.currentFeedback = null;
      $http.get('/api/feedbacks').success(function (f) {
        for (var i = 0; i < f.length; i++) {
          if (f[i].lectureID == lecture_id && f[i].pageNumber == $scope.currentPageNumber) {
            $scope.currentFeedback = f[i];
          }
        }
        //if no feedback exist we have to create the first one
        if ($scope.currentFeedback == null) {
          $http.post('/api/feedbacks', {
            name: null,
            lessonRelevance: $scope.relevance,
            nbrStudentsLost: $scope.nbrStuLost,
            mood: $scope.generalMood,
            pageNumber: $scope.currentPageNumber,
            lectureID: lecture_id
          });
          getCurrentFeedback();
        }
      });
    }

    getCurrentFeedback();

    $http.get('/api/chats').success(function (msg) {
      for (var i = 0; i < msg.length; i++) {
        if (msg[i].lectureID == lecture_id) {
          $scope.msgReceived.push(msg[i]);
        }
      }
    });



    socket.socket.on('chat_msg', function (msg) {
      if (msg.lectureID === lecture_id) {
        $scope.msgReceived.push(msg);
      }
    });


    socket.socket.on('mood', function (mood) {
      if (mood.lectureID === lecture_id) {
        switch (mood.mood) {
        case "+2":
          $scope.generalMood += 2;
          break;
        case "+1":
          $scope.generalMood += 1;
          break;
        case "-1":
          $scope.generalMood -= 1;
          break;
        case "-2":
          $scope.generalMood -= 2;
          break;
        default:
          $scope.generalMood = 0;
        }
        if ($scope.generalMood > 1) {
          document.getElementById("mood").src = "assets/images/healthy.png"

        } else if ($scope.generalMood >= -1 && $scope.generalMood <= 1) {
          document.getElementById("mood").src = "assets/images/injured.png"

        } else {
          document.getElementById("mood").src = "assets/images/dead.png"
        }

        //updating the feedback
        $http.put('api/feedbacks/' + $scope.currentFeedback._id, {
          mood: $scope.generalMood
        });

      }

    });
    var relevance = 1;
    socket.socket.on('relevance', function (rel) {
      if (rel.lectureID === lecture_id) {
        switch (rel.rel) {
        case "+1":
          relevance += 1;
          break;
        case "-1":
          relevance -= 1;
          break;
        default:
          relevance = 0;
        }
        if (relevance === 0) {
          $scope.relevance = "-";
        } else if (relevance < 0) {
          $scope.relevance = "This lesson is not interesting !";
        } else {
          $scope.relevance = "This lesson is interesting !";
        }
      }
    });

    socket.socket.on('studentLost', function (student) {
      if (student.lectureID === lecture_id) {
        $scope.nbrStuLost += 1;
        $scope.stuName.push(student);
      }
    });

    socket.socket.on('studentNotLost', function (student) {
      if (student.lectureID === lecture_id) {
        $scope.nbrStuLost -= 1;
        for (var i = 0; i < $scope.stuName.length; i++) {
          if ($scope.stuName[i].name === student.name) {
            $scope.stuName.splice(i, 1);
          }
        }
      }
    });


    $scope.scroll = function () {
      var box = document.getElementById("chatDiv");
      box.scrollTop = box.scrollHeight;
    };


    //
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    //
    $http.get('/api/lectures/' + lecture_id).success(function (lecture) {
      $scope.currentLecture = lecture;

      var pdfUrl = $scope.currentLecture.pdfPath;
      console.log("pdfUrl : " + pdfUrl);


      //
      // Disable workers to avoid yet another cross-origin issue (workers need
      // the URL of the script to be loaded, and dynamically loading a cross-origin
      // script does not work).
      //
      // PDFJS.disableWorker = true;

      //
      // In cases when the pdf.worker.js is located at the different folder than the
      // pdf.js's one, or the pdf.js is executed via eval(), the workerSrc property
      // shall be specified.
      //
      // PDFJS.workerSrc = 'components/pfjs/pdf.worker.js';


      var pdfDoc = null,
        pageNum = 1,
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

        // Update page counters
        document.getElementById('page_num').textContent = pageNum;
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
       * Displays previous page.
       */
      $scope.onPrevPage = function () {
        if (pageNum <= 1) {
          return;
        }
        pageNum--;
        socket.socket.emit('pageNumber', {
          'pageNumber': pageNum,
          'followedId': lecture_id
        });
        $http.put('api/lectures/' + lecture_id, {
          actualPage: pageNum
        });
        $scope.currentPageNumber = pageNum;
        getCurrentFeedback();

        queueRenderPage(pageNum);
      }

      /**
       * Displays next page.
       */
      $scope.onNextPage = function () {
        if (pageNum >= pdfDoc.numPages) {
          return;
        }
        pageNum++;
        socket.socket.emit('pageNumber', {
          'pageNumber': pageNum,
          'followedId': lecture_id
        });
        $http.put('api/lectures/' + lecture_id, {
          actualPage: pageNum
        });
        $scope.currentPageNumber = pageNum;
        getCurrentFeedback();

        queueRenderPage(pageNum);
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


    });

  });