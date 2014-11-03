'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );
var Keen = require( 'keen-js' );

function BrjsvctViewModel() {
	this._statService = ServiceRegistry.getService( 'stat.service' );

	var brjs_v_ct = this._statService.buildQuery("count", {
		eventCollection: "installs",
		groupBy: "toolkit_name"
	});
	var brjs_v_ct_request = this._statService.executeQuery(brjs_v_ct, function(){

		new Keen.Visualization(this, document.getElementById("brjs-vs-ct"), {
			chartType: "piechart",
			title: "BRJS vs CT Installs",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});

	});


	function doUpdate() {
		brjs_v_ct_request.refresh();
	}
	this._statService.on( 'new_install', doUpdate );
}

module.exports = BrjsvctViewModel;
