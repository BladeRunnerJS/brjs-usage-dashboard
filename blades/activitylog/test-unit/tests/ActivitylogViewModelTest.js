var ActivitylogViewModelTest = TestCase( 'ActivitylogViewModelTest' );

var ActivitylogViewModel = require( 'dashboard/activitylog/ActivitylogViewModel' );

ActivitylogViewModelTest.prototype.testSomething = function() {
  var model = new ActivitylogViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
