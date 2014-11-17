'use strict';

angular.module('twebEasyLearningApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            // Logged in, redirect to home
            if (Auth.isBoth() === true) {
              $location.path('/');
            } else if (Auth.isProf() === true) {
              $location.path('/profView');
            } else if (Auth.isStudent()) {
              $location.path('/studentView');
            } else {
              //no role found going to / path;
              $location.path('/');
            }

          })
          .catch(function (err) {
            $scope.errors.other = err.message;
          });
      }
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  });