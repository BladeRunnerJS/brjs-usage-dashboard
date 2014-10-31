'use strict';

var Keen = require( 'keen-js' );

function AverageFilesInApp() {

	var averageAppFileCount = new Keen.Query("average", {
  		eventCollection: "bundlesets",
  		targetProperty: "file_count.total_count" // get sub-property - cool that you can do this!
	});

	// TODO: separate request and response from UI update (Visualization)
	var averageAppFileRequest = window.KEEN_CLIENT.run(averageAppFileCount, function(response){
	  // Pass in raw data, or reference to "this" (request instance)
	  var myChart = new Keen.Visualization(this, document.getElementById("avg-files"), {
		  chartType: "metric",
		  title: "Files",
		  colors: ["#49c5b1"],
			width: 'auto'
		});
	});

	// TODO: update to be triggered upon Firebase update
	setInterval( function() {
		averageAppFileRequest.refresh();
	}, 10000 );

}

module.exports = AverageFilesInApp;
