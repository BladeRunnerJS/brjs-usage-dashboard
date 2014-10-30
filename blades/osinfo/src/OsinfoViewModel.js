'use strict';

var ko = require( 'ko' );
var i18n = require( 'br/I18n' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function OsinfoViewModel() {
	this.eventHub = ServiceRegistry.getService( 'br.event-hub' );
	this.welcomeMessage = ko.observable( 'Welcome to your new Blade.' );
	this.buttonClickMessage = ko.observable( i18n( 'dashboard.osinfo.button.click.message' ) );
	this.logWelcome();
}

OsinfoViewModel.prototype.buttonClicked = function() {
	console.log( 'button clicked' );
	var channel = this.eventHub.channel('osinfo-channel');
	channel.trigger( 'hello-event', { some: 'Hello World!' } );
};

OsinfoViewModel.prototype.logWelcome = function() {
	console.log(  this.welcomeMessage() );
}

module.exports = OsinfoViewModel;
