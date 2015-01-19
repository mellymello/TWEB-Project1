'use strict';

angular.module('twebEasyLearningApp')
  .controller('ProfstartCtrl', function ($scope, $http, Auth, socket, $window, $state) {

    $scope.uploadProgress = 0;

    $scope.pastLectures = [];
    var listPdf = [];
    var listProfID = Auth.getCurrentUser()._id;
    //get all lectures of the prof
    $http.get('/api/lectures').success(function (lectures) {
      listPdf = lectures;
      for (var i = 0; i < listPdf.length; i++) {
        $http.get('/api/lectures/' + listPdf[i]._id).success(function (lecture) {
          if (listProfID === lecture.professorID) {
            $scope.pastLectures.push(lecture);
          }
        });
      }

    });


    var isFileSelected = false;

    //selecting the file to upload
    $scope.onFileSelect = function ($files) {
      if ($files != undefined) {
        $scope.selectedFile = $files[0]
        if($scope.selectedFile != undefined){
        if ($scope.selectedFile.type !== 'application/pdf') {
          alert('Please chose a pdf file !');
          return;
        }

        isFileSelected = true;
      }
      }
    };


    $scope.createLesson = function () {
      console.log("create the new lesson");

      if ($scope.lectureTitle === '' || $scope.lectureTitle === undefined) {
        alert('Please to give a title to this lecture');
        return;
      }
      if ($scope.lectureDescription === '' || $scope.lectureDescription === undefined) {
        alert('Please give a description to this lecture');
        return;
      }
      if (!isFileSelected) {
        alert('Please select a pdf file for this lecture!');
        return
      }


      $scope.creds = {
        bucket: 'tweb-pdf',
        access_key: 'AKIAJOOXWUKXINZBPI3Q',
        secret_key: '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'
      };

      console.log("upload called !!!");
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

      if ($scope.selectedFile) {
        var params = {
          Key: $scope.selectedFile.name,
          ContentType: $scope.selectedFile.type,
          Body: $scope.selectedFile,
          ServerSideEncryption: 'AES256'
        };



        bucket.putObject(params, function (err, data) {
          if (err) {
            // There Was An Error With Your S3 Config
            alert("There is a problem uploading the pdf on Amazon S3...please try again :-(");
            console.log(err.message);
            return false;
          } else {
            // Success!


            $http.post('/api/lectures', {
              title: $scope.lectureTitle,
              description: $scope.lectureDescription,
              creationDate: getTime(),
              professorID: Auth.getCurrentUser()._id,
              professorName: Auth.getCurrentUser().name,
              pdfPath: 'https://s3-eu-west-1.amazonaws.com/tweb-pdf/'+$scope.selectedFile.name,
              actualPage: 1
            });

            $state.go($state.$current, null, { reload: true });

          }
        })
          .on('httpUploadProgress', function (progress) {
            // Log Progress Information
            $scope.uploadProgress = (Math.round(progress.loaded / progress.total * 100));
            $scope.$digest();
          });
      } else {
        // No File Selected
        alert('No File Selected');
      }
    }


    //start lecture
    $scope.startLecture = function (lecture_id) {
      $window.location = '/profView?lecture_id=' + lecture_id;

    };

    //View Stat
    $scope.stats = function (lecture_id) {
      $window.location = '/profStats?lecture_id=' + lecture_id
    };

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
      var y = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var x = y + "/" + month + "/" + day + " " + h + ":" + m + ":" + s;
      return x;
    }

  });
