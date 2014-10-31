'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function OsinfoViewModel() {
}


OsinfoViewModel.prototype.init = function() {

	var osName = new Keen.Query("count", {
		eventCollection: "installs",
		groupBy: "os_name"
	});

	var osNameRequest = window.KEEN_CLIENT.run(osName, function(response){
		window.KEEN_CLIENT.draw(osName,
			document.getElementById("os-info-name"), {
			chartType: "piechart",
			title: "OS Name",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});
	});

	var javaVersion = new Keen.Query("count", {
		eventCollection: "installs",
		groupBy: "java_version"
	});
	var javaVersionRequest = window.KEEN_CLIENT.run(javaVersion, function(response){
		window.KEEN_CLIENT.draw(javaVersion,
			document.getElementById("os-info-java-version"), {
			chartType: "piechart",
			title: "Java Version",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});
	});


	var statService = require("br/ServiceRegistry").getService( 'stat.service' );
	function doUpdate() {
		osNameRequest.refresh();
		javaVersionRequest.refresh();
	}
	statService.on( 'new_install', function( data ) {
		doUpdate();
	}, this );
}

module.exports = OsinfoViewModel;
