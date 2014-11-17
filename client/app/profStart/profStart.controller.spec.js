'use strict';

describe('Controller: ProfstartCtrl', function () {

  // load the controller's module
  beforeEach(module('twebEasyLearningApp'));

  var ProfstartCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfstartCtrl = $controller('ProfstartCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
