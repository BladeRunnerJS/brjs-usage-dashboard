'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );
var Keen = require( 'keen-js' );

function OsinfoViewModel() {
	var self = this;

	self._statService = ServiceRegistry.getService( 'stat.service' );
	self._osNamesChart = null;
	self._javaVersionsChart = null;

	var osName = this._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "os_name"
	});

	var osNameRequest = self._statService.executeQuery(osName, function() {
		if( self._osNamesChart ) self._osNamesChart.remove();

		self._osNamesChart = new Keen.Visualization(this, document.getElementById("os-info-name"), {
			chartType: "piechart",
			title: "OS Name",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});
	});

	var javaVersion = self._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "java_version"
	});
	var javaVersionRequest = self._statService.executeQuery(javaVersion, function(){
		if( self._javaVersionsChart ) self._javaVersionsChart.remove();

		self._javaVersionsChart = new Keen.Visualization(this, document.getElementById("os-info-java-version"), {
			chartType: "piechart",
			title: "Java Version",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});
	});

	function doUpdate() {
		osNameRequest.refresh();
		javaVersionRequest.refresh();
	}
	this._statService.on( 'new_install', doUpdate );
}

module.exports = OsinfoViewModel;
