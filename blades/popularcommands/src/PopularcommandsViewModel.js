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

	var popularCommandsRequest = window.KEEN_CLIENT.run(popularCommands, function(response){
		window.KEEN_CLIENT.draw(popularCommands,
			document.getElementById("popular-commands"), {
			title: "Popular Commands",
		});
	});

	var statService = require("br/ServiceRegistry").getService( 'stat.service' );
	function doUpdate() {
		popularCommandsRequest.refresh();
	}
	statService.on( 'new_command', function( data ) {
		doUpdate();
	}, this );

}

module.exports = PopularcommandsViewModel;
