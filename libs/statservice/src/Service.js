'use strict';

var Firebase = require( 'firebase' );

function Service() {
	this._firebase = new Firebase( 'https://brjs-usage-dashboard.firebaseio.com/' );
	this._bundleSets = this._firebase.child( 'bundlesets' );
}

Service.prototype.getBundleSets = function( callback ) {
	this._bundleSets.on( 'value', function( collection ) {

		var bundleSetData = [];
		collection.forEach( function( child ) {
			var data = child.val();
			bundleSetData.push( data );
		} );
		callback( null, bundleSetData );

	} );
};

module.exports = Service;
