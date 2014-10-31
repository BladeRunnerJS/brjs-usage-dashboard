'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function BrjsvctViewModel() {
}

BrjsvctViewModel.prototype.init = function() {

	var brjs_v_ct = new Keen.Query("count", {
		eventCollection: "installs",
		groupBy: "toolkit_name"
	});
	var brjs_v_ct_request = window.KEEN_CLIENT.run(brjs_v_ct, function(response){
		window.KEEN_CLIENT.draw(brjs_v_ct,
			document.getElementById("brjs-vs-ct"), {
			chartType: "piechart",
			title: "BRJS vs CT Installs",
			width: 'auto',
			chartOptions: {
				legend: { position: "bottom" },
			}
		});
	});


	var statService = require("br/ServiceRegistry").getService( 'stat.service' );
	function doUpdate() {
		brjs_v_ct_request.refresh();
	}
	statService.on( 'new_install', function( data ) {
		doUpdate();
	}, this );
}

module.exports = BrjsvctViewModel;
