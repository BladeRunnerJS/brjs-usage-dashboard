ExampleClassTest = TestCase("ExampleClassTest");

var Statservice = require("statservice/Statservice");

ExampleClassTest.prototype.testHelloWorldUtil = function()
{
	assertEquals( "Hello World!", Statservice.helloWorldUtil() );
};
