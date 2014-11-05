'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function OSInformation() {
	this._statService = ServiceRegistry.getService( 'stat.service' );
	this._osNamesChart = null;
	this._javaVersionsChart = null;

	// Operating systems that BRJS has been installed on
	var osName = this._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "os_name"
	});

	this._osNameRequest = this._statService.executeQuery(osName, this._osNameExecutionComplete.bind( this ) );

	// Versions of Java BRJS is being run on
	var javaVersion = this._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "java_version"
	});

	this._javaVersionRequest =
		this._statService.executeQuery( javaVersion, this._javaVersionExecutionComplete.bind( this ) );

	this._statService.on( 'new_install', this._updateStats.bind( this ) );
}

OSInformation.prototype._osNameExecutionComplete = function() {
	if( this._osNamesChart ) {
		this._osNamesChart.remove();
	}

	this._osNamesChart = this._statService.createVisualisation(
		this._osNameRequest,
		document.getElementById("os-info-name"),
		{
			chartType: "piechart",
			title: "OS Name",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		}
	);
};

OSInformation.prototype._javaVersionExecutionComplete = function(){
	if( this._javaVersionsChart ) this._javaVersionsChart.remove();

	this._javaVersionsChart = this._statService.createVisualisation(
		this._javaVersionRequest,
		document.getElementById("os-info-java-version"),
		{
			chartType: "piechart",
			title: "Java Version",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		}
	);
};

OSInformation.prototype._updateStats = function() {
	this._osNameRequest.refresh();
	this._javaVersionRequest.refresh();
};

module.exports = OSInformation;
