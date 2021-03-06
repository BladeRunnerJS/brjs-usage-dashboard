'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function PopularcommandsViewModel() {
	var self = this;

	self._statService = ServiceRegistry.getService( 'stat.service' );
	self._chart = null;

	var popularCommands = self._statService.buildQuery("count", {
	    eventCollection: "commands",
	    timeframe: "this_7_days",
	    interval: "daily",
	    groupBy: "command_name"
  });

	var popularCommandsRequest = self._statService.executeQuery(popularCommands, function(){
		if( self._chart ) {
			self._chart.remove();
		}

		self._chart = self._statService.createVisualisation(this, document.getElementById("popular-commands"), {
			title: "Popular Commands",
			width: 'auto'
		});
	});

	function doUpdate() {
		popularCommandsRequest.refresh();
	}
	self._statService.on( 'new_command', doUpdate );

}

module.exports = PopularcommandsViewModel;
