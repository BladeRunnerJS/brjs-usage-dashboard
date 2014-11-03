'use strict';

var Keen = require( 'keen-js' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function AverageBundlesetDurationViewModel() {
	this._statService = ServiceRegistry.getService( 'stat.service' );

	var minBundlesetExecTime = this._statService.buildQuery( "minimum", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration" // get sub-property - cool that you can do this!
	});
	var minBundlesetExecTimeRequest = this._statService.executeQuery( minBundlesetExecTime, function() {
		new Keen.Visualization(this, document.getElementById("min-bundleset-time"), {
			chartType: "metric",
			title: "min milliseconds",
			colors: ["#49c5b1"],
				width: 'auto'
		}	);
	} );

	var averageBundlesetExecTime = this._statService.buildQuery("average", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration" // get sub-property - cool that you can do this!
	});
	var averageBundlesetExecTimeRequest =
		this._statService.executeQuery( averageBundlesetExecTime, function(){
			new Keen.Visualization(this, document.getElementById("avg-bundleset-time"), {
				chartType: "metric",
				title: "average milliseconds",
				colors: ["#49c5b1"],
					width: 'auto'
				});
			});


	var maxBundlesetExecTime = new Keen.Query("maximum", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration" // get sub-property - cool that you can do this!
	});
	var maxBundlesetExecTimeRequest =
		this._statService.executeQuery( maxBundlesetExecTime, function(){
			new Keen.Visualization(this, document.getElementById("max-bundleset-time"), {
				chartType: "metric",
				title: "max milliseconds",
				colors: ["#49c5b1"],
					width: 'auto'
			});
	});

	function doUpdate() {
		minBundlesetExecTimeRequest.refresh();
		averageBundlesetExecTimeRequest.refresh();
		maxBundlesetExecTimeRequest.refresh();
	}
	this._statService.on( 'new_bundleset', doUpdate );

}

module.exports = AverageBundlesetDurationViewModel;
