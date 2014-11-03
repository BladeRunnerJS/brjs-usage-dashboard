'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );
var Keen = require( 'keen-js' );

function BrjsversionsViewModel() {
	this._statService = ServiceRegistry.getService( 'stat.service' );

	var brjs_versions = this._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "toolkit_version"
	});
	var brjs_versions_request = this._statService.executeQuery(brjs_versions, function(){
		new Keen.Visualization(this, document.getElementById("brjs-versions"), {
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
	this._statService.on( 'new_install', doUpdate );

}
module.exports = BrjsversionsViewModel;
