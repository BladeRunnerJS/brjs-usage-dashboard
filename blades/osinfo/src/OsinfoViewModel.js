'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );
var Keen = require( 'keen-js' );

function OsinfoViewModel() {
	this._statService = ServiceRegistry.getService( 'stat.service' );

	var osName = this._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "os_name"
	});

	var osNameRequest = this._statService.executeQuery(osName, function(){
		new Keen.Visualization(this, document.getElementById("os-info-name"), {
			chartType: "piechart",
			title: "OS Name",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});
	});

	var javaVersion = this._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "java_version"
	});
	var javaVersionRequest = this._statService.executeQuery(javaVersion, function(){
		new Keen.Visualization(this, document.getElementById("os-info-java-version"), {
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
