'use strict';

require( 'jasmine' );

var oldConsoleLog = console.log;

var BrjsversionsViewModel = require( 'dashboard/brjsversions/BrjsversionsViewModel' );

describe('Brjsversions Tests', function() {

	beforeEach(function() {
		console.log = jasmine.createSpy();
	});

	afterEach(function() {
		console.log = oldConsoleLog;
	});

	it( 'Should log hello on load', function() {
		new BrjsversionsViewModel();
		expect(console.log).toHaveBeenCalledWith('Welcome to your new Blade.');
	});

});
