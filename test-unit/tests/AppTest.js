var AppTest = TestCase("AppTest");

var App = require("dashboard/App");

AppTest.prototype.testSomething = function() {
	assertEquals( "hello world!", App.getHello() );
};
