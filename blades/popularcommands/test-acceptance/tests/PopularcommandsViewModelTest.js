'use strict';

require( 'jasmine' );

var oldConsoleLog = console.log;

var PopularcommandsViewModel = require( 'dashboard/popularcommands/PopularcommandsViewModel' );

describe('Popularcommands Tests', function() {

	beforeEach(function() {
		console.log = jasmine.createSpy();
	});

	afterEach(function() {
		console.log = oldConsoleLog;
	});

	it( 'Should log hello on load', function() {
		new PopularcommandsViewModel();
		expect(console.log).toHaveBeenCalledWith('Welcome to your new Blade.');
	});

});
