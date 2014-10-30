'use strict';

var Keen = require( 'keen-js' );

function AverageFilesInApp() {

	// TODO: Move client into a service
	var client = new Keen({
  	projectId: "5452adc733e406748303ecb4",
  	readKey: "0e4cf7ec70352aa3f109d88f9fdf9fe67e91f78a0a01d4f3d132c53c03730cee2d3a9a5a4631b28574f467fea78b0fdb9586ca723cb006eb94b8e8a1bc50abc19e0d90e939df51d1f81b85311c3e590d22e9a4e84d2f3efcacc642ff8dc70ed284301399c9ef7eeb78ce04a8799e8c26"
	});

	var averageAppFileCount = new Keen.Query("average", {
  	eventCollection: "bundlesets",
  	targetProperty: "file_count.total_count" // get sub-property - cool that you can do this!
	});

	// TODO: separate request and response from UI update (Visualization)
	var request = client.run(averageAppFileCount, function(response){
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
		request.refresh();
	}, 10000 );

}

module.exports = AverageFilesInApp;
