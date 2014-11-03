'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );
var Keen = require( 'keen-js' );

function PopularcommandsViewModel() {

	this._statService = ServiceRegistry.getService( 'stat.service' );

	var popularCommands = this._statService.buildQuery("count", {
	    eventCollection: "commands",
	    timeframe: "this_7_days",
	    interval: "daily",
	    groupBy: "command_name"
  });

	var popularCommandsRequest = this._statService.executeQuery(popularCommands, function(){
		new Keen.Visualization(this, document.getElementById("popular-commands"), {
			title: "Popular Commands",
			width: 'auto'
		});
	});

	function doUpdate() {
		popularCommandsRequest.refresh();
	}
	this._statService.on( 'new_command', doUpdate );

}

module.exports = PopularcommandsViewModel;
