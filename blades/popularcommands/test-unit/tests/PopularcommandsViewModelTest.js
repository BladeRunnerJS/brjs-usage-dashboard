var PopularcommandsViewModelTest = TestCase( 'PopularcommandsViewModelTest' );

var PopularcommandsViewModel = require( 'dashboard/popularcommands/PopularcommandsViewModel' );

PopularcommandsViewModelTest.prototype.testSomething = function() {
  var model = new PopularcommandsViewModel();
  assertEquals( 'Welcome to your new Blade.', model.welcomeMessage() );
};
