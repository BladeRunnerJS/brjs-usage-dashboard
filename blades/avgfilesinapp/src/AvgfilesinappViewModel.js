'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function AverageFilesInApp() {
	var self = this;

	self._statService = ServiceRegistry.getService( 'stat.service' );

	// Minimum number of files found in a BRJS app
	var minAppFileCount = self._statService.buildQuery("minimum", {
  		eventCollection: "bundlesets",
  		targetProperty: "file_count.total_count"
	});

	var minAppFileRequest = self._statService.executeQuery(minAppFileCount, function(){
	  self._statService.createVisualisation(this, document.getElementById("min-files"), {
		  chartType: "metric",
		  title: "Min Files",
		  colors: ["#49c5b1"],
			width: 'auto'
		});
	});

	// Average number of files in a BRJS app
	var averageAppFileCount = self._statService.buildQuery("average", {
		eventCollection: "bundlesets",
		targetProperty: "file_count.total_count"
	});

	var averageAppFileRequest = self._statService.executeQuery(averageAppFileCount, function(){
		self._statService.createVisualisation(this, document.getElementById("avg-files"), {
			chartType: "metric",
			title: "Avg Files",
			colors: ["#49c5b1"],
				width: 'auto'
			});
	});

	// Maximum number of files found in a BRJS app
	var maxAppFileCount = self._statService.buildQuery("maximum", {
		eventCollection: "bundlesets",
		targetProperty: "file_count.total_count"
	});

	var maxAppFileRequest = self._statService.executeQuery(maxAppFileCount, function(){
	self._statService.createVisualisation(this, document.getElementById("max-files"), {
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
	self._statService.on( 'new_bundleset', doUpdate );

}

module.exports = AverageFilesInApp;
