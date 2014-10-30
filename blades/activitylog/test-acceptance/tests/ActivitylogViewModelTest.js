'use strict';

require( 'jasmine' );

var oldConsoleLog = console.log;

var ActivitylogViewModel = require( 'dashboard/activitylog/ActivitylogViewModel' );

describe('Activitylog Tests', function() {

	beforeEach(function() {
		console.log = jasmine.createSpy();
	});

	afterEach(function() {
		console.log = oldConsoleLog;
	});

	it( 'Should log hello on load', function() {
		new ActivitylogViewModel();
		expect(console.log).toHaveBeenCalledWith('Welcome to your new Blade.');
	});

});
