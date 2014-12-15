'use strict';

angular.module('twebEasyLearningApp')
  .controller('ProfstartCtrl', function ($scope, $upload, $http, Auth, socket, $window) {

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

    /*
    //to start a class presentation with the selected lecture
    $scope.startLecture = function (lecture_id) {
      $window.location = '/profView?lecture_id=' + lecture_id;
    };
*/


    var isFileSelected = false;

    //selecting the file to upload
    $scope.onFileSelect = function ($files) {
      if ($files != undefined) {
        $scope.selectedFile = $files[0]
        if ($scope.selectedFile.type !== 'application/pdf') {
          alert('Please chose a pdf file !');
          return;
        }

        isFileSelected = true;
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

      //      $scope.upload = function () {
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
            alert(err.message);
            return false;
          } else {
            // Success!
            alert('Upload Done');

            

            $http.post('/api/lectures', {
              title: $scope.lectureTitle,
              description: $scope.lectureDescription,
              creationDate: getTime(),
              professorID: Auth.getCurrentUser()._id,
              professorName: Auth.getCurrentUser().name,
              pdfPath: 'https://s3-eu-west-1.amazonaws.com/tweb-pdf/'+$scope.selectedFile.name,
              actualPage: 1
            });


          }
        })
          .on('httpUploadProgress', function (progress) {
            // Log Progress Information
            console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
          });
      } else {
        // No File Selected
        alert('No File Selected');
      }
      //}



      /*
      $scope.upload = $upload.upload({
        url: $'https://s3-eu-west-1.amazonaws.com/tweb-pdf/pdf/' //S3 upload url including bucket name,
        method: 'POST',
        data: {
          key: $scope.selectedFile.name, // the key to store the file on S3, could be file name or customized
          //AWSAccessKeyId: <YOUR AWS AccessKey Id>,
          acl: 'public', // sets the access to the uploaded file in the bucker: private or public
          //policy: $scope.policy, // base64-encoded json policy (see article below)
          //signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
          "Content-Type": $scope.selectedFile.type != '' ? $scope.selectedFile.type : 'application/octet-stream' // content type of the file (NotEmpty),
          filename: $scope.selectedFile.name // this is needed for Flash polyfill IE8-9
        },
        file: $scope.selectedFile,
      });

      */


      /*
      //uploading
      $scope.upload = $upload.upload({
        url: '/upload',
        method: 'POST',
        file: $scope.selectedFile
      }).progress(function (evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {

        console.log("upload DONE");


        $http.post('/api/lectures', {
          title: $scope.lectureTitle,
          description: $scope.lectureDescription,
          creationDate: getTime(),
          professorID: Auth.getCurrentUser()._id,
          professorName: Auth.getCurrentUser().name,
          pdfPath: data,
          actualPage: 1
        });
        $window.location.reload();

      });

      */


    }


    //start lecture
    $scope.startLecture = function (lecture_id) {
      $window.location = '/profView?lecture_id=' + lecture_id;

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