'use strict';

var Keen = require( 'keen-js' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function AverageFilesInApp() {

	this._statService = ServiceRegistry.getService( 'stat.service' );

	var minAppFileCount = this._statService.buildQuery("minimum", {
  		eventCollection: "bundlesets",
  		targetProperty: "file_count.total_count" // get sub-property - cool that you can do this!
	});

	// TODO: separate request and response from UI update (Visualization)
	var minAppFileRequest = this._statService.executeQuery(minAppFileCount, function(){
	  // Pass in raw data, or reference to "this" (request instance)
	  new Keen.Visualization(this, document.getElementById("min-files"), {
		  chartType: "metric",
		  title: "Min Files",
		  colors: ["#49c5b1"],
			width: 'auto'
		});
	});

	var averageAppFileCount = this._statService.buildQuery("average", {
		eventCollection: "bundlesets",
		targetProperty: "file_count.total_count" // get sub-property - cool that you can do this!
	});

	// TODO: separate request and response from UI update (Visualization)
	var averageAppFileRequest = this._statService.executeQuery(averageAppFileCount, function(){
	// Pass in raw data, or reference to "this" (request instance)
	new Keen.Visualization(this, document.getElementById("avg-files"), {
		chartType: "metric",
		title: "Avg Files",
		colors: ["#49c5b1"],
			width: 'auto'
		});
	});

	var maxAppFileCount = this._statService.buildQuery("maximum", {
		eventCollection: "bundlesets",
		targetProperty: "file_count.total_count" // get sub-property - cool that you can do this!
	});

	// TODO: separate request and response from UI update (Visualization)
	var maxAppFileRequest = this._statService.executeQuery(maxAppFileCount, function(){
	// Pass in raw data, or reference to "this" (request instance)
	new Keen.Visualization(this, document.getElementById("max-files"), {
		chartType: "metric",
		title: "Max Files",
		colors: ["#49c5b1"],
			width: 'auto'
		});
	});


	function doUpdate() {
		minAppFileRequest.refresh();
		averageAppFileRequest.refresh();
		maxAppFileRequest.refresh();
	}
	this._statService.on( 'new_bundleset', doUpdate );

}

module.exports = AverageFilesInApp;
