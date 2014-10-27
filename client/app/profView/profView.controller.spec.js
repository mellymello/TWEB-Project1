'use strict';

describe('Controller: ProfviewCtrl', function () {

  // load the controller's module
  beforeEach(module('twebEasyLearningApp'));

  var ProfviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfviewCtrl = $controller('ProfviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
