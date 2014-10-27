'use strict';

angular.module('twebEasyLearningApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profView', {
        url: '/profView',
        templateUrl: 'app/profView/profView.html',
        controller: 'ProfviewCtrl'
      });
  });