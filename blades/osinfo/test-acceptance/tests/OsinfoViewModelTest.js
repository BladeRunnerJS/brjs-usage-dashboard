'use strict';

require( 'jasmine' );

var oldConsoleLog = console.log;

var OsinfoViewModel = require( 'dashboard/osinfo/OsinfoViewModel' );

describe('Osinfo Tests', function() {

	beforeEach(function() {
		console.log = jasmine.createSpy();
	});

	afterEach(function() {
		console.log = oldConsoleLog;
	});

	it( 'Should log hello on load', function() {
		new OsinfoViewModel();
		expect(console.log).toHaveBeenCalledWith('Welcome to your new Blade.');
	});

});
