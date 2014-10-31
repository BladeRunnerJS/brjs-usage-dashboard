'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function PopularcommandsViewModel() {
}

PopularcommandsViewModel.prototype.init = function() {

	var popularCommands = new Keen.Query("count", {
	    eventCollection: "commands",
	    timeframe: "this_7_days",
	    interval: "daily",
	    groupBy: "command_name"
  });


	window.KEEN_CLIENT.draw(popularCommands,
		document.getElementById("popular-commands"), {
		title: "Popular Commands",
	});

}

module.exports = PopularcommandsViewModel;
