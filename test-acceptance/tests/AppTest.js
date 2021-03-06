'use strict';

require( 'jasmine' );

var oldConsoleLog = console.log;

var App = require("dashboard/App");

describe('App Tests', function() {

	beforeEach(function() {
		console.log = jasmine.createSpy();
	});

	afterEach(function() {
		console.log = oldConsoleLog;
	});

	it( 'Should say hello', function() {
		App.logHello();
		expect(console.log).toHaveBeenCalledWith('hello world!');
	});

});
