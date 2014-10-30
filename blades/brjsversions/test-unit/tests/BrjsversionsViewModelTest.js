var BrjsversionsViewModelTest = TestCase( 'BrjsversionsViewModelTest' );

var BrjsversionsViewModel = require( 'dashboard/brjsversions/BrjsversionsViewModel' );

BrjsversionsViewModelTest.prototype.testSomething = function() {
  var model = new BrjsversionsViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
