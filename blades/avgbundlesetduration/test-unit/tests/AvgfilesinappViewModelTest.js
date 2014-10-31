var AvgfilesinappViewModelTest = TestCase( 'AvgfilesinappViewModelTest' );

var AvgfilesinappViewModel = require( 'dashboard/avgfilesinapp/AvgfilesinappViewModel' );

AvgfilesinappViewModelTest.prototype.testSomething = function() {
  var model = new AvgfilesinappViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
