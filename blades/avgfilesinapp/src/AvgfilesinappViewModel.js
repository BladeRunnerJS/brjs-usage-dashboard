'use strict';

var ko = require( 'ko' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function AvgfilesinappViewModel() {
	this._statsService = ServiceRegistry.getService( 'stat.service' );
	this._statsService.getBundleSets( this.statsCallback.bind( this ) );

	this.averageFilesInApp = ko.observable( 0 );
}

AvgfilesinappViewModel.prototype.statsCallback = function( err, data ) {
	console.log( data );
	var total = 0,
			length = 0,
			i = 0;
	for( length = data.length; i < length; ++i ) {
		total += data[ i ].file_count.total_count;
	}
	var avg = Math.round( total / length );
	this.averageFilesInApp( avg );
};

module.exports = AvgfilesinappViewModel;
