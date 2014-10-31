'use strict';

var Keen = require( 'keen-js' );

function AverageBundlesetDurationViewModel() {

	var minBundlesetExecTime = new Keen.Query("minimum", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration" // get sub-property - cool that you can do this!
	});
	var minBundlesetExecTimeRequest = window.KEEN_CLIENT.run(minBundlesetExecTime, function(response){
	// Pass in raw data, or reference to "this" (request instance)
	var myChart = new Keen.Visualization(this, document.getElementById("min-bundleset-time"), {
		chartType: "metric",
		title: "min milliseconds",
		colors: ["#49c5b1"],
			width: 'auto'
		});
	});


	var averageBundlesetExecTime = new Keen.Query("average", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration" // get sub-property - cool that you can do this!
	});
	var averageBundlesetExecTimeRequest = window.KEEN_CLIENT.run(averageBundlesetExecTime, function(response){
	// Pass in raw data, or reference to "this" (request instance)
	var myChart = new Keen.Visualization(this, document.getElementById("avg-bundleset-time"), {
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
	var maxBundlesetExecTimeRequest = window.KEEN_CLIENT.run(maxBundlesetExecTime, function(response){
	// Pass in raw data, or reference to "this" (request instance)
	var myChart = new Keen.Visualization(this, document.getElementById("max-bundleset-time"), {
		chartType: "metric",
		title: "max milliseconds",
		colors: ["#49c5b1"],
			width: 'auto'
		});
	});

	// TODO: update to be triggered upon Firebase update
	setInterval( function() {
		minBundlesetExecTimeRequest.refresh();
		averageBundlesetExecTimeRequest.refresh();
		maxBundlesetExecTimeRequest.refresh();
	}, 10000 );

}

module.exports = AverageBundlesetDurationViewModel;
