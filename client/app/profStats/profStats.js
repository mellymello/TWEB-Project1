'use strict';

angular.module('twebEasyLearningApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profStats', {
        url: '/profStats',
        templateUrl: 'app/profStats/profStats.html',
        controller: 'ProfstatsCtrl'
      });
  });