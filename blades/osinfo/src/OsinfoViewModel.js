'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function OsinfoViewModel() {
}


OsinfoViewModel.prototype.init = function() {
	// TODO: Move client into a service
	var client = new Keen({
	projectId: "5452adc733e406748303ecb4",
	readKey: "0e4cf7ec70352aa3f109d88f9fdf9fe67e91f78a0a01d4f3d132c53c03730cee2d3a9a5a4631b28574f467fea78b0fdb9586ca723cb006eb94b8e8a1bc50abc19e0d90e939df51d1f81b85311c3e590d22e9a4e84d2f3efcacc642ff8dc70ed284301399c9ef7eeb78ce04a8799e8c26"
	});

	var osName = new Keen.Query("count", {
		eventCollection: "installs",
		groupBy: "os_name"
	});
	client.draw(osName,
		document.getElementById("os-info-name"), {
		chartType: "piechart",
		title: "OS Name"
	});

	var javaVersion = new Keen.Query("count", {
		eventCollection: "installs",
		groupBy: "java_version"
	});
	client.draw(javaVersion,
		document.getElementById("os-info-java-version"), {
		chartType: "piechart",
		title: "Java Version"
	});

	setInterval( function() {
		request.refresh();
	}, 10000 );
}

module.exports = OsinfoViewModel;
