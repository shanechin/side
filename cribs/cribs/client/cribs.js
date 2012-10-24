"use strict";

var DormRouter = Backbone.Router.extend({
	routes:{
		//routeMatcher:routeName
		"*home": "defaultRoute",
		":dorm_id": "main"
	},
	main:function(dorm_id){
		console.log("We routed" + dorm_id);
		this.navigate(dorm_id,true);
	},
	defaultRoute:function(home){
		console.log("We routed home?");
	}
});

var Dorms = new Meteor.Collection('dorms');
var Router = new DormRouter;

if (Meteor.isClient) {


	Template.dormlist.dorms = function(){
		return Dorms.find({},{});
	};

	//Bind a click handler to clicked dorm
	Template.dorm.events({
		'click':function(){
			console.log("dorm clicked!" + this._id + this.name);
			Router.main(this._id);
			Session.set('this_dorm', this._id);
		}
	});
	
}


Meteor.startup(function(){
	//Alows for bookmarkable urls
	Backbone.history.start({pushState:true});
});