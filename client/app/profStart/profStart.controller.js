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


      
      //uploading
      $scope.upload = $upload.upload({
        url: '/api/lectures',
        method: 'POST',
        file: $scope.selectedFile
      }).progress(function (evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {
        console.log('posting on lectures api');
        $http.post('/api/lectures', {
          title: $scope.lectureTitle,
          description: $scope.lectureDescription,
          creationDate: Date.now(),
          professorID: Auth.getCurrentUser._id,
          pdfFile: data._id,
          actualPage: 1
        }).success(function () {
          alert('The new lesson has been created !');
        });
      });




    }
  });