var BrjsvctViewModelTest = TestCase( 'BrjsvctViewModelTest' );

var BrjsvctViewModel = require( 'dashboard/brjsvct/BrjsvctViewModel' );

BrjsvctViewModelTest.prototype.testSomething = function() {
  var model = new BrjsvctViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
