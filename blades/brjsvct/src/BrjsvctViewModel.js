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
	window.KEEN_CLIENT.draw(brjs_v_ct,
		document.getElementById("brjs-vs-ct"), {
		chartType: "piechart",
		title: "BRJS vs CT Installs"
	});

	setInterval( function() {
		request.refresh();
	}, 10000 );
}

module.exports = BrjsvctViewModel;
