'use strict';

describe('Controller: StudentstartCtrl', function () {

  // load the controller's module
  beforeEach(module('twebEasyLearningApp'));

  var StudentstartCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentstartCtrl = $controller('StudentstartCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
