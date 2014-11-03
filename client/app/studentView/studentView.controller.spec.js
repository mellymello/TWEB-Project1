'use strict';

describe('Controller: StudentviewCtrl', function () {

  // load the controller's module
  beforeEach(module('twebEasyLearningApp'));

  var StudentviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentviewCtrl = $controller('StudentviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
