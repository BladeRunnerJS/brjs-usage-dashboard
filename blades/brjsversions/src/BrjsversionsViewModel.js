'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function BrjsversionsViewModel() {
	var self = this;

	self._statService = ServiceRegistry.getService( 'stat.service' );
	self._brjsVersionsChart = null;

	var brjsVersionsQuery = self._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "toolkit_version"
	});
	var brjsVersionsRequest = self._statService.executeQuery(brjsVersionsQuery, function(){
		if( self._brjsVersionsChart ) self._brjsVersionsChart.remove();

		self._brjsVersionsChart = self._statService.createVisualisation(this, document.getElementById("brjs-versions"), {
			chartType: "piechart",
			title: "BRJS Versions",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});
	});

	function doUpdate() {
		brjsVersionsRequest.refresh();
	}
	self._statService.on( 'new_install', doUpdate );

}
module.exports = BrjsversionsViewModel;
