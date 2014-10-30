var AppTest = TestCase("AppTest");

var App = require("brjsusagedashboard/App");

AppTest.prototype.testSomething = function() {
	assertEquals( "hello world!", App.getHello() );
};
