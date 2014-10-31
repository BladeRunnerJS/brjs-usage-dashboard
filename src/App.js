'use strict';

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );
var ServiceRegistry = require( 'br/ServiceRegistry' );


window.KEEN_CLIENT = new Keen({
    projectId: "5452adc733e406748303ecb4",
    readKey: "0e4cf7ec70352aa3f109d88f9fdf9fe67e91f78a0a01d4f3d132c53c03730cee2d3a9a5a4631b28574f467fea78b0fdb9586ca723cb006eb94b8e8a1bc50abc19e0d90e939df51d1f81b85311c3e590d22e9a4e84d2f3efcacc642ff8dc70ed284301399c9ef7eeb78ce04a8799e8c26"
});


// Blades
var OSInfoBlade = require( 'dashboard/osinfo/OsinfoViewModel' );
var BrjsvctViewBlade = require( 'dashboard/brjsvct/BrjsvctViewModel' );
var PopularcommandsViewBlade = require( 'dashboard/popularcommands/PopularcommandsViewModel' );
var AvgfilesinappViewBlade = require( 'dashboard/avgfilesinapp/AvgfilesinappViewModel' );
var AverageBundlesetDuration = require( 'dashboard/avgbundlesetduration/AverageBundlesetDurationViewModel' );
var BrjsvctViewBlade = require( 'dashboard/brjsvct/BrjsvctViewModel' );
var ActivitylogViewBlade = require( 'dashboard/activitylog/ActivitylogViewModel' );

var App = function() {
  var StatsService = require( 'statservice/Service' );
  var statService = new StatsService();
  ServiceRegistry.registerService( 'stat.service', statService );

  this._statsEl = document.getElementById("stats");

  this._addBladeToUI( OSInfoBlade, 'dashboard.osinfo.view-template' );
  this._addBladeToUI( BrjsvctViewBlade, 'dashboard.brjsvct.view-template' );
  this._addBladeToUI( PopularcommandsViewBlade, 'dashboard.popularcommands.view-template' );
  this._addBladeToUI( AvgfilesinappViewBlade, 'dashboard.avgfilesinapp.view-template' );
  this._addBladeToUI( AverageBundlesetDuration, 'dashboard.avgbundlesetduration.view-template' );
  this._addBladeToUI( BrjsvctViewBlade, 'dashboard.brjsvct.view-template' );
  this._addBladeToUI( ActivitylogViewBlade, 'dashboard.activitylog.view-template' );
};

App.prototype._addBladeToUI = function( BladeDefinition, viewId ) {
  var blade = new BladeDefinition();
  var component = new KnockoutComponent( viewId, blade );
  this._statsEl.appendChild( component.getElement() );
  if (blade.init) {
      blade.init();
  }
};

module.exports = App;
