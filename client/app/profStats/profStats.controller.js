'use strict';

angular.module('twebEasyLearningApp')
  .controller('ProfstatsCtrl', function ($scope, $http, $location) {
    $scope.slideStats = [];

    var lecture_id = $location.search().lecture_id;
    $http.get('/api/feedbacks').success(function (stats) {
      for (var i = 0; i < stats.length; i++) {
        if (stats[i].lectureID == lecture_id) {
          $scope.slideStats.push(stats[i]);
        }
      }
    });

  });
