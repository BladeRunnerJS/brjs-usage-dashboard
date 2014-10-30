'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function PopularcommandsViewModel() {
	this.eventHub = ServiceRegistry.getService( 'br.event-hub' );
	this.welcomeMessage = ko.observable( 'Welcome to your new Blade.' );
	this.buttonClickMessage = ko.observable( i18n( 'dashboard.popularcommands.button.click.message' ) );
	this.logWelcome();
}

PopularcommandsViewModel.prototype.buttonClicked = function() {
	console.log( 'button clicked' );
	var channel = this.eventHub.channel('popularcommands-channel');
	channel.trigger( 'hello-event', { some: 'Hello World!' } );
};

PopularcommandsViewModel.prototype.logWelcome = function() {
	console.log(  this.welcomeMessage() );
}

module.exports = PopularcommandsViewModel;
