'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function BrjsvctViewModel() {
}

BrjsvctViewModel.prototype.init = function() {
	// TODO: Move client into a service
	var client = new Keen({
	projectId: "5452adc733e406748303ecb4",
	readKey: "0e4cf7ec70352aa3f109d88f9fdf9fe67e91f78a0a01d4f3d132c53c03730cee2d3a9a5a4631b28574f467fea78b0fdb9586ca723cb006eb94b8e8a1bc50abc19e0d90e939df51d1f81b85311c3e590d22e9a4e84d2f3efcacc642ff8dc70ed284301399c9ef7eeb78ce04a8799e8c26"
	});

	var visitor_origins = new Keen.Query("count", {
		eventCollection: "installs",
		groupBy: "toolkit_name"
	});
	client.draw(visitor_origins,
		document.getElementById("brjs-vs-ct"), {
		chartType: "piechart",
		title: "BRJS vs CT Installs"
	});

	setInterval( function() {
		request.refresh();
	}, 10000 );
}

module.exports = BrjsvctViewModel;
