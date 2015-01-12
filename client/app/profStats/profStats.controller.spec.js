'use strict';

describe('Controller: ProfstatsCtrl', function () {

  // load the controller's module
  beforeEach(module('twebEasyLearningApp'));

  var ProfstatsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfstatsCtrl = $controller('ProfstatsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
