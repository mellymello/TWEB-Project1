'use strict';

angular.module('twebEasyLearningApp')
  .controller('ProfstartCtrl', function ($scope, $upload, $http, Auth, socket) {

    //get all lectures of the prof
    $http.get('/api/lectures/' + Auth.getCurrentUser()._id).success(function (lectures) {
      $scope.profLectures = lectures;
    });

    console.log($scope.profLectures);

    /*
    //to start a class presentation with the selected lecture
    $scope.startLecture = function (lecture_id) {
      $window.location = '/profView?lecture_id=' + lecture_id;
    };
*/


  //selecting the file to upload
    $scope.onFileSelect = function ($files) {
      $scope.selectedFile=$files
    };
  

    $scope.createLesson = function() {
      console.log("create the new lesson");
      
      
      // file upload using code from github.com/danialfarid/angular-file-upload
      for (var i = 0; i < $scope.selectedFile.length; i++) {
        var file = $scope.selectedFile[i];

        
        $scope.upload = $upload.upload({
          url: '/upload',
          method: 'POST',
          data: {
            id: $scope.lecture_id,
            professorID: Auth.getCurrentUser()._id
          },
          file: file,
        }).progress(function (evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        });
      }
    }

  });