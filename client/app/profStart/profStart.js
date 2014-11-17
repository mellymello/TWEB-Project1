'use strict';

angular.module('twebEasyLearningApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profStart', {
        url: '/profStart',
        templateUrl: 'app/profStart/profStart.html',
        controller: 'ProfstartCtrl'
      });
  });