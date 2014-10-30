var OsinfoViewModelTest = TestCase( 'OsinfoViewModelTest' );

var OsinfoViewModel = require( 'dashboard/osinfo/OsinfoViewModel' );

OsinfoViewModelTest.prototype.testSomething = function() {
  var model = new OsinfoViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
