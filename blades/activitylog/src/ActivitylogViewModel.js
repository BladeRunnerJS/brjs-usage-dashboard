'use strict';

var ko = require( 'ko' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function ActivitylogViewModel() {
	this._statService = ServiceRegistry.getService( 'stat.service' );

	this._statService.on( 'new_bundleset', function( data ) {
		this.logActivity( 'bundleset', data );
	}, this );

	this._statService.on( 'new_command', function( data ) {
		this.logActivity( 'command', data );
	}, this );

	this._statService.on( 'new_install', function( data ) {
		this.logActivity( 'install', data );
	}, this );
}

ActivitylogViewModel.prototype.logActivity = function( activity, data ) {
	// TODO: output to UI
	// Maybe log with type and timestamp and then the ability to expand and see JSON?
	console.log( activity, data );
	var el = document.createElement( 'div' );
	var text = document.createTextNode( activity + ' : ' + JSON.stringify( data ) );
	el.appendChild( text );
	document.getElementById( 'activity-log' ).appendChild( el );
};

module.exports = ActivitylogViewModel;
