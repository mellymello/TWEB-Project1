'use strict';

angular.module('twebEasyLearningApp')
  .controller('StudentviewCtrl', function ($scope, $http, socket, Auth, $location) {

  
    var lecture_id = $location.search().lecture_id;
    $scope.lecture_id = lecture_id;

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    function getTime() {
      var d = new Date();
      var h = addZero(d.getHours());
      var m = addZero(d.getMinutes());
      var s = addZero(d.getSeconds());
      var x = h + ":" + m + ":" + s;
      return x;
    }

    /*$http.get('/api/actualPage?'+num.pageNumer).success(function(num) {
      queueRenderPage(num.pageNumber);
      document.getElementById('page_num').textContent = num.pageNumber;
    });  */


    $scope.chatMsg = '';
    $scope.send = function () {
      if ($scope.chatMsg === '') {
        return;
      }
      //posting the informations on the database:
      $http.post('/api/chats', {
        sentBy: Auth.getCurrentUser().name,
        message: $scope.chatMsg,
        hour: getTime(),
        lectureID: $scope.lecture_id
      });

      socket.socket.emit('chat_msg', {
        sentBy: Auth.getCurrentUser().name,
        message: $scope.chatMsg,
        hour: getTime()
      });

      $scope.chatMsg = "";
    };

    $scope.isFollowed = true;
    socket.socket.on('pageNumber', function (num) {
      if ($scope.isFollowed == true) {
        queueRenderPage(num);
        pageNum = num;
      }
    });



    $scope.relPlusOne = function () {
      socket.socket.emit('relevance', "+1");
    };

    $scope.GotIt = function () {
      socket.socket.emit('mood', "+2");
    };

    $scope.understood = function () {
      socket.socket.emit('mood', "+1");
    };

    $scope.relMinusOne = function () {
      socket.socket.emit('relevance', "-1");
    };
    $scope.notSure = function () {
      socket.socket.emit('mood', "-1");
    };

    $scope.lost = function () {
      socket.socket.emit('mood', "-2");
      socket.socket.emit('studentLost', Auth.getCurrentUser().name);
    };





    $http.get('/api/lectures/' + $scope.lecture_id).success(function (lecture) {
      $scope.currentLecture = lecture;
        
    var url = $scope.currentLecture.pdfPath;
    var pdfUrl = url.substring(7,url.length);
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