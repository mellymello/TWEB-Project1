'use strict';

angular.module('twebEasyLearningApp')
  .controller('ProfstartCtrl', function ($scope, $upload, $http, Auth, socket) {

    $scope.pastLectures = [];
    var listPdf = [];
    var listProfID = Auth.getCurrentUser()._id;
    //get all lectures of the prof
    $http.get('/api/lectures').success(function (lectures) {
      listPdf = lectures;
      for (var i = 0; i< listPdf.length; i ++)
      {
        $http.get('/api/lectures/'+ listPdf[i]._id).success(function(lecture){
          if ( listProfID === lecture.professorID)
          {
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


       $http.post('/api/lectures', {title: $scope.lectureTitle,description: $scope.lectureDescription,creationDate: getTime(),professorID: Auth.getCurrentUser()._id,actualPage: 1});
       alert('The new lesson has been created !');
      $scope.lectureTitle = '';
      $scope.lectureDescription = '';
      //uploading
      $scope.upload = $upload.upload({
        url: '/upload',
        method: 'POST',
        file: $scope.selectedFile 
      }).progress(function (evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {
        console.log(data);
      });

    }
    
    
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
    var x = y+ "/" + month + "/" + day +" " +h + ":" + m + ":" + s;
    return x;
}
    
  });