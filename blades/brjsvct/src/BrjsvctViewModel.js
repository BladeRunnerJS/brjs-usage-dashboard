'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function BrjsvctViewModel() {
	var self = this;

	self._statService = ServiceRegistry.getService( 'stat.service' );

	// How many are BRJS toolkits and how many are Caplin Trader toolkits?
	var brjsVersusCTQuery = self._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "toolkit_name"
	});
	var brjsVersusCTRequest = self._statService.executeQuery(brjsVersusCTQuery, function(){

		self._statService.createVisualisation(this, document.getElementById("brjs-vs-ct"), {
			chartType: "piechart",
			title: "BRJS vs CT Installs",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});

	});

	function doUpdate() {
		brjsVersusCTRequest.refresh();
	}
	self._statService.on( 'new_install', doUpdate );
}

module.exports = BrjsvctViewModel;
