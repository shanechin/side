"use strict";
Session.set('isHidden',null);
var DormRouter = Backbone.Router.extend({
	routes:{
		//routeMatcher:routeName		
		"review/:id":"createReview",
		":dorm_id": "main",
		"*home": "defaultRoute"
	},
	main:function(dorm_id){
		console.log("We routed" + dorm_id);
		//change the url bar
		Session.set('isHidden',true);
		this.navigate("review/"+dorm_id,true);
	},
	defaultRoute:function(home){
		console.log("We routed home?");
	},
	createReview:function(id){
		console.log("Write a review");
	}
});

var Dorms = new Meteor.Collection('dorms');
var Reviews = new Meteor.Collection('reviews');
var Router = new DormRouter;

if (Meteor.isClient) {


	Template.dormlist.dorms = function(){
		return Dorms.find({},{});
	};
	
	/*
	 * Returns the value to be put in the hidden
	 * class within the dormlist template.
	 */
	Template.dormlist.hidden = function(){
		return Session.equals('isHidden',null)? '' : 'hidden';
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