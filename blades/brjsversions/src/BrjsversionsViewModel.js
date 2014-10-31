'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function BrjsversionsViewModel() {

	var brjs_versions = new Keen.Query("count", {
		eventCollection: "installs",
		groupBy: "toolkit_version"
	});
	var brjs_versions_request = window.KEEN_CLIENT.run(brjs_versions, function(response){
		window.KEEN_CLIENT.draw(brjs_versions,
			document.getElementById("brjs-versions"), {
			chartType: "piechart",
			title: "BRJS Versions"
		});
	});

	setInterval( function() {
		brjs_versions_request.refresh();
	}, 10000 );

}
module.exports = BrjsversionsViewModel;
