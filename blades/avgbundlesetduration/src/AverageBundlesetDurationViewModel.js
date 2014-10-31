'use strict';

var Keen = require( 'keen-js' );

function AverageBundlesetDurationViewModel() {

	var averageBundlesetExecTime = new Keen.Query("average", {
		eventCollection: "bundlesets",
		targetProperty: "execution_duration" // get sub-property - cool that you can do this!
	});
	var averageBundlesetExecTimeRequest = window.KEEN_CLIENT.run(averageBundlesetExecTime, function(response){
	// Pass in raw data, or reference to "this" (request instance)
	var myChart = new Keen.Visualization(this, document.getElementById("avg-bundleset-time"), {
		chartType: "metric",
		title: "milliseconds",
		colors: ["#49c5b1"],
			width: 'auto'
		});
	});

	// TODO: update to be triggered upon Firebase update
	setInterval( function() {
		averageBundlesetExecTimeRequest.refresh();
	}, 10000 );

}

module.exports = AverageBundlesetDurationViewModel;
