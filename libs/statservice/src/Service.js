'use strict';

var Pusher = require( 'pusher' );
var Keen = require( 'keen-js' );

var br = require( 'br/Core' );
var Emitr = require( 'emitr' );

function Service() {
	this._keen = new Keen({
			projectId: "5452adc733e406748303ecb4",
			readKey: "0e4cf7ec70352aa3f109d88f9fdf9fe67e91f78a0a01d4f3d132c53c03730cee2d3a9a5a4631b28574f467fea78b0fdb9586ca723cb006eb94b8e8a1bc50abc19e0d90e939df51d1f81b85311c3e590d22e9a4e84d2f3efcacc642ff8dc70ed284301399c9ef7eeb78ce04a8799e8c26"
	} );
	this._pusher = new Pusher( '054cce0687e2e37c48df' );

	// Pusher.log = function(msg) {
	// 	console.log(msg);
	// };

	this._bundleSets = this._pusher.subscribe( 'bundlesets' );
	this._commands = this._pusher.subscribe( 'commands' );
	this._installs = this._pusher.subscribe( 'installs' );

	this._bundleSets.bind( 'new-stat', function( data ) {
		this.trigger( 'new_bundleset', data );
	}, this );

	this._commands.bind( 'new-stat', function( data ) {
		this.trigger( 'new_command', data );
	}, this );

	this._installs.bind( 'new-stat', function( data ) {
		this.trigger( 'new_install', data );
	}, this );
}
br.extend( Service, Emitr );

Service.prototype.buildQuery = function( analysisType, params ) {
	var query = new Keen.Query( analysisType, params );
	return query;
};

Service.prototype.executeQuery = function( query, callback ) {
	return this._keen.run( query, callback );
};

Service.prototype.createVisualisation = function( req, el, options ) {
	return new Keen.Visualization( req, el, options );
};

Service.prototype.getBundleSets = function( callback ) {
	this._getAllCollectionValues( 'bundlesets', callback );
};

Service.prototype.getCommands = function( callback ) {
	this._getAllCollectionValues( 'commands', callback );
};

Service.prototype.getInstalls = function( callback ) {
	this._getAllCollectionValues( 'installs', callback );
};

Service.prototype._getAllCollectionValues = function( collectionName, callback ) {
	var extraction = new Keen.Query('extraction', {
		eventCollection: collectionName,
		latest: 10
	} );

	try {
		this._keen.run( extraction, function( data ) {
			callback( null, data.result );
		} );
	}
	catch( e ) {
		callback( e );
	}
};

module.exports = Service;
