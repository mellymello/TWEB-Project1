'use strict';

angular.module('twebEasyLearningApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('studentView', {
        url: '/studentView',
        templateUrl: 'app/studentView/studentView.html',
        controller: 'StudentviewCtrl'
      });
  });