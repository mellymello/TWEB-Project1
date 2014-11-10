'use strict';



angular.module('twebEasyLearningApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};
    
    function checkRoleCheckboxes(){
        if($scope.user.isStudent === undefined && $scope.user.isProf === undefined){
            return false;
        }
        else{
            return true;
        }
    }

    $scope.register = function(form) {
      $scope.submitted = true;
        
      if(checkRoleCheckboxes()===true){
          if($scope.user.isStudent === true && $scope.user.isProf === true){
            $scope.user.role='both';
          }
          else if($scope.user.isProf === true){
            $scope.user.role='prof';
          }
          else{
            $scope.user.role='student';
          }
          if(form.$valid) {
            Auth.createUser({
              name: $scope.user.name,
              email: $scope.user.email,
              password: $scope.user.password,
              role: $scope.user.role

            })
            .then( function() {
              // Account created, redirect to home
              $location.path('/');
            })
            .catch( function(err) {
              err = err.data;
              $scope.errors = {};

              // Update validity of form fields that match the mongoose errors
              angular.forEach(err.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
              });
            });
              
            console.log($scope.user);
          }
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
