'use strict';

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

// Blades
var OSInfoBlade = require( 'dashboard/osinfo/OsinfoViewModel' );
var BrjsvctViewBlade = require( 'dashboard/brjsvct/BrjsvctViewModel' );
var BrjsVersionsViewBlade = require( 'dashboard/brjsversions/BrjsversionsViewModel' );
var PopularcommandsViewBlade = require( 'dashboard/popularcommands/PopularcommandsViewModel' );
var AvgfilesinappViewBlade = require( 'dashboard/avgfilesinapp/AvgfilesinappViewModel' );
var AverageBundlesetDuration = require( 'dashboard/avgbundlesetduration/AverageBundlesetDurationViewModel' );
var ActivitylogViewBlade = require( 'dashboard/activitylog/ActivitylogViewModel' );

var App = function() {
  var StatsService = require( 'statservice/Service' );
  var statService = new StatsService();
  ServiceRegistry.registerService( 'stat.service', statService );

  this._statsEl = document.getElementById("stats");

  // Hack: Keen uses Google charts and we're occasionally seeing
  // a problem where the google library hasn't yet loaded.
  var waitForGoogle = setInterval( function() {
    if( typeof google !== 'undefined' ) {
      this._addBlades();
      clearInterval( waitForGoogle );
    }
  }.bind( this ), 200 );
};

App.prototype._addBlades = function() {
  this._addBladeToUI( OSInfoBlade, 'dashboard.osinfo.view-template' );
  this._addBladeToUI( BrjsvctViewBlade, 'dashboard.brjsvct.view-template' );
  this._addBladeToUI( BrjsVersionsViewBlade, 'dashboard.brjsversions.view-template' );
  this._addBladeToUI( PopularcommandsViewBlade, 'dashboard.popularcommands.view-template' );
  this._addBladeToUI( AvgfilesinappViewBlade, 'dashboard.avgfilesinapp.view-template' );
  this._addBladeToUI( AverageBundlesetDuration, 'dashboard.avgbundlesetduration.view-template' );

  this._addBladeToUI( ActivitylogViewBlade, 'dashboard.activitylog.view-template' );
};

App.prototype._addBladeToUI = function( BladeDefinition, viewId ) {
  var blade = new BladeDefinition();
  var component = new KnockoutComponent( viewId, blade );
  this._statsEl.appendChild( component.getElement() );
};

module.exports = App;
