'use strict';

angular.module('twebEasyLearningApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('studentStart', {
        url: '/studentStart',
        templateUrl: 'app/studentStart/studentStart.html',
        controller: 'StudentstartCtrl'
      });
  });