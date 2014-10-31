'use strict';

var Firebase = require( 'firebase' );
var br = require( 'br/Core' );
var Emitr = require( 'emitr' );

function Service() {
	this._firebase = new Firebase( 'https://brjs-usage-dashboard.firebaseio.com/' );

	this._bundleSets = this._firebase.child( 'bundlesets' );
	this._commands = this._firebase.child( 'command' );
	this._installs = this._firebase.child( 'installs' );

	this._bundleSets.on( 'child_added', function( child ) {
		this.trigger( 'new_bundleset', child.val() );
	}, this );

	this._commands.on( 'child_added', function( child ) {
		this.trigger( 'new_command', child.val() );
	}, this );

	this._installs.on( 'child_added', function( child ) {
		this.trigger( 'new_install', child.val() );
	}, this );
}
br.extend( Service, Emitr );


Service.prototype.getBundleSets = function( callback ) {
	getAllCollectionValues( this._bundleSets, callback );
};

function getAllCollectionValues( collection, callback ) {
	collection.on( 'value', function( collection ) {

		var collectionData = [];
		collection.forEach( function( child ) {
			var data = child.val();
			collectionData.push( data );
		} );
		callback( null, collectionData );

	} );
}

module.exports = Service;
