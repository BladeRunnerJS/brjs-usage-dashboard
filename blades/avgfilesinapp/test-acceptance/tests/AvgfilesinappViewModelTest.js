'use strict';

require( 'jasmine' );

var oldConsoleLog = console.log;

var AvgfilesinappViewModel = require( 'dashboard/avgfilesinapp/AvgfilesinappViewModel' );

describe('Avgfilesinapp Tests', function() {

	beforeEach(function() {
		console.log = jasmine.createSpy();
	});

	afterEach(function() {
		console.log = oldConsoleLog;
	});

	it( 'Should log hello on load', function() {
		new AvgfilesinappViewModel();
		expect(console.log).toHaveBeenCalledWith('Welcome to your new Blade.');
	});

});
