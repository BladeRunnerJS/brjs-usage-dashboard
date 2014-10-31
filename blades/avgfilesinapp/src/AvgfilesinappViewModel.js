'use strict';

var Keen = require( 'keen-js' );

function AverageFilesInApp() {

	var minAppFileCount = new Keen.Query("minimum", {
  		eventCollection: "bundlesets",
  		targetProperty: "file_count.total_count" // get sub-property - cool that you can do this!
	});

	// TODO: separate request and response from UI update (Visualization)
	var minAppFileRequest = window.KEEN_CLIENT.run(minAppFileCount, function(response){
	  // Pass in raw data, or reference to "this" (request instance)
	  var myChart = new Keen.Visualization(this, document.getElementById("min-files"), {
		  chartType: "metric",
		  title: "Min Files",
		  colors: ["#49c5b1"],
			width: 'auto'
		});
	});

	var averageAppFileCount = new Keen.Query("average", {
		eventCollection: "bundlesets",
		targetProperty: "file_count.total_count" // get sub-property - cool that you can do this!
	});

	// TODO: separate request and response from UI update (Visualization)
	var averageAppFileRequest = window.KEEN_CLIENT.run(averageAppFileCount, function(response){
	// Pass in raw data, or reference to "this" (request instance)
	var myChart = new Keen.Visualization(this, document.getElementById("avg-files"), {
		chartType: "metric",
		title: "Avg Files",
		colors: ["#49c5b1"],
			width: 'auto'
		});
	});

	var maxAppFileCount = new Keen.Query("maximum", {
		eventCollection: "bundlesets",
		targetProperty: "file_count.total_count" // get sub-property - cool that you can do this!
	});

	// TODO: separate request and response from UI update (Visualization)
	var maxAppFileRequest = window.KEEN_CLIENT.run(maxAppFileCount, function(response){
	// Pass in raw data, or reference to "this" (request instance)
	var myChart = new Keen.Visualization(this, document.getElementById("max-files"), {
		chartType: "metric",
		title: "Max Files",
		colors: ["#49c5b1"],
			width: 'auto'
		});
	});


	var statService = require("br/ServiceRegistry").getService( 'stat.service' );
	function doUpdate() {
		minAppFileRequest.refresh();
		averageAppFileRequest.refresh();
		maxAppFileRequest.refresh();
	}
	statService.on( 'new_bundleset', function( data ) {
		doUpdate();
	}, this );

}

module.exports = AverageFilesInApp;
