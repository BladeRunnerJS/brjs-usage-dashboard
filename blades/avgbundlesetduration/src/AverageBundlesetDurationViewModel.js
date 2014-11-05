'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function AverageBundlesetDurationViewModel() {
	var self = this;

	self._statService = ServiceRegistry.getService( 'stat.service' );

	// Minimum time taken to build a bundleset
	var minBundlesetExecTime = self._statService.buildQuery( "minimum", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration"
	});
	var minBundlesetExecTimeRequest = self._statService.executeQuery( minBundlesetExecTime, function() {
		self._statService.createVisualisation(this, document.getElementById("min-bundleset-time"), {
			chartType: "metric",
			title: "min milliseconds",
			colors: ["#49c5b1"],
				width: 'auto'
		}	);
	} );

	// Average time taken to build a bundleset
	var averageBundlesetExecTime = self._statService.buildQuery("average", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration"
	});
	var averageBundlesetExecTimeRequest =
		self._statService.executeQuery( averageBundlesetExecTime, function(){
			self._statService.createVisualisation(this, document.getElementById("avg-bundleset-time"), {
				chartType: "metric",
				title: "average milliseconds",
				colors: ["#49c5b1"],
					width: 'auto'
				});
			});

	// Maximum time taken to build a bundleset
	var maxBundlesetExecTime = self._statService.buildQuery("maximum", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration"
	});
	var maxBundlesetExecTimeRequest =
		self._statService.executeQuery( maxBundlesetExecTime, function(){
			self._statService.createVisualisation( this, document.getElementById("max-bundleset-time"), {
				chartType: "metric",
				title: "max milliseconds",
				colors: ["#49c5b1"],
					width: 'auto'
			} );
	});

	function doUpdate() {
		minBundlesetExecTimeRequest.refresh();
		averageBundlesetExecTimeRequest.refresh();
		maxBundlesetExecTimeRequest.refresh();
	}
	self._statService.on( 'new_bundleset', doUpdate );

}

module.exports = AverageBundlesetDurationViewModel;
