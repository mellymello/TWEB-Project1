'use strict';

angular.module('twebEasyLearningApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
   


   

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
