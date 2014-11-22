'use strict';

angular.module('twebEasyLearningApp')
  .controller('ProfviewCtrl', function ($scope, $http, socket, Auth) {
    $scope.msgReceived = [];
    $scope.relevance ='';
    $scope.stuName = [];
    $scope.nbrStuLost = 0;


    $http.get('/api/chats').success(function (msg) {
      $scope.msgReceived = msg;
    });

    socket.socket.on('chat_msg', function (msg) {
      $scope.msgReceived.push(msg);
    });
  
    var generalMood = 1;
    socket.socket.on('mood', function (mood) {
      switch(mood){
        case "+2":
            generalMood +=2;
            break;
        case "+1":
            generalMood +=1;
            break;
        case "-1":
            generalMood -=1;
            break;
        case "-2":
            generalMood -=2;
            break;
        default:
            generalMood = 0;
      }
      if (generalMood === 0)
      {
        document.getElementById("mood").src = "assets/images/injured.png"
      }
      else if (generalMood < 0 )
      {
        document.getElementById("mood").src = "assets/images/dead.png"
      }
      else{
        document.getElementById("mood").src = "assets/images/healthy.png"
      }
      
    });
  var relevance = 1;
  socket.socket.on('relevance', function(rel){
      switch(rel){
        case "+1":
            relevance +=1;
            break;
        case "-1":
            relevance -=1;
            break;
        default:
            relevance = 0;
      }
      if (relevance === 0)
      {
        $scope.relevance = "-";
      }
      else if (relevance < 0 )
      {
        $scope.relevance = "This lesson is not interesting !";
      }
      else{
        $scope.relevance = "This lesson is interesting !";
      }
      
    });
  
  socket.socket.on('studentLost', function(student){
       $scope.nbrStuLost +=1;
      $scope.stuName.push(student);
    });


    $scope.scroll = function () {
      var box = document.getElementById("chatDiv");
      box.scrollTop = box.scrollHeight;
    };


    //
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    //
    var pdfUrl = 'data/testFile.pdf';


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
      socket.socket.emit('pageNumber', pageNum);
      //$http.post('/api/actualPage',  { pageNumber: pageNum });
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
      socket.socket.emit('pageNumber', pageNum);
      //$http.post('/api/actualPage',  { pageNumber: pageNum });
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