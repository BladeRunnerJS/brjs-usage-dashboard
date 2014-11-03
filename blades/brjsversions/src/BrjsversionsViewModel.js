'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );
var Keen = require( 'keen-js' );

function BrjsversionsViewModel() {
	var self = this;

	self._statService = ServiceRegistry.getService( 'stat.service' );
	self._brjsVersionsChart = null;

	var brjs_versions = self._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "toolkit_version"
	});
	var brjs_versions_request = self._statService.executeQuery(brjs_versions, function(){
		if( self._brjsVersionsChart ) self._brjsVersionsChart.remove();

		self._brjsVersionsChart = new Keen.Visualization(this, document.getElementById("brjs-versions"), {
			chartType: "piechart",
			title: "BRJS Versions",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});
	});

	function doUpdate() {
		brjs_versions_request.refresh();
	}
	self._statService.on( 'new_install', doUpdate );

}
module.exports = BrjsversionsViewModel;
