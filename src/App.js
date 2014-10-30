'use strict';

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );

// Blades
var OSInfoBlade = require( 'dashboard/osinfo/OsinfoViewModel' );
var BrjsvctViewBlade = require( 'dashboard/brjsvct/BrjsvctViewModel' );
var PopularcommandsViewBlade = require( 'dashboard/popularcommands/PopularcommandsViewModel' );
var AvgfilesinappViewBlade = require( 'dashboard/avgfilesinapp/AvgfilesinappViewModel' );
var BrjsvctViewBlade = require( 'dashboard/brjsvct/BrjsvctViewModel' );
var ActivitylogViewBlade = require( 'dashboard/activitylog/ActivitylogViewModel' );

var App = function() {
  this._statsEl = document.getElementById("stats");

  this._addBladeToUI( OSInfoBlade, 'dashboard.osinfo.view-template' );
  this._addBladeToUI( BrjsvctViewBlade, 'dashboard.brjsvct.view-template' );
  this._addBladeToUI( PopularcommandsViewBlade, 'dashboard.popularcommands.view-template' );
  this._addBladeToUI( AvgfilesinappViewBlade, 'dashboard.avgfilesinapp.view-template' );
  this._addBladeToUI( BrjsvctViewBlade, 'dashboard.brjsvct.view-template' );
  this._addBladeToUI( ActivitylogViewBlade, 'dashboard.activitylog.view-template' );
};

App.prototype._addBladeToUI = function( BladeDefinition, viewId ) {
  var blade = new BladeDefinition();
  var component = new KnockoutComponent( viewId, blade );
  this._statsEl.appendChild( component.getElement() );
};

module.exports = App;
