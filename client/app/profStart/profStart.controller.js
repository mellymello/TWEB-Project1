'use strict';

angular.module('twebEasyLearningApp')
  .controller('ProfstartCtrl', function ($scope, $upload, $http, socket){
    /*
    //get all lectures of the prof
    $http.get('/api/lectures/' + Auth.getCurrentUser()._id).success(function (lectures) {
      $scope.profLectures = lectures;
    });


    //to start a class presentation with the selected lecture
    $scope.startLecture = function (lecture_id) {
      $window.location = '/profView?lecture_id=' + lecture_id;
    };
*/


      $scope.onFileSelect = function ($files) {
      console.log("uploading...");
      
      $scope.lecture_id = data._id;
      $scope.lecture

      // file upload using code from github.com/danialfarid/angular-file-upload
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];


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

    };



  });